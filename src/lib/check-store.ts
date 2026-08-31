import { AvailabilityStatus } from '@/services';

export interface ServiceResult {
  status: AvailabilityStatus;
  detail?: string;
}

export interface CheckProgress {
  total: number;
  available: number;
  taken: number;
  errors: number;
  unknown: number;
  checked: number;
  isStreaming: boolean;
  isComplete: boolean;
}

const EMPTY_PROGRESS: CheckProgress = {
  total: 0,
  available: 0,
  taken: 0,
  errors: 0,
  unknown: 0,
  checked: 0,
  isStreaming: false,
  isComplete: false,
};

export class CheckStore {
  private results = new Map<string, ServiceResult>();
  private serviceListeners = new Map<string, Set<() => void>>();
  private progressListeners = new Set<() => void>();
  private progress: CheckProgress = EMPTY_PROGRESS;
  private serviceNames: string[] = [];

  getService = (service: string): ServiceResult | undefined => this.results.get(service);

  getProgress = (): CheckProgress => this.progress;

  subscribeService = (service: string, listener: () => void) => {
    let set = this.serviceListeners.get(service);
    if (!set) {
      set = new Set();
      this.serviceListeners.set(service, set);
    }
    set.add(listener);
    return () => {
      set.delete(listener);
    };
  };

  subscribeProgress = (listener: () => void) => {
    this.progressListeners.add(listener);
    return () => {
      this.progressListeners.delete(listener);
    };
  };

  reset(serviceNames: string[], isStreaming: boolean) {
    this.results.clear();
    this.serviceNames = serviceNames;
    this.progress = { ...EMPTY_PROGRESS, total: serviceNames.length, isStreaming };
    for (const set of this.serviceListeners.values()) {
      for (const listener of set) listener();
    }
    this.notifyProgress();
  }

  applyBatch(batch: Array<[string, ServiceResult]>) {
    for (const [service, result] of batch) {
      this.results.set(service, result);
      const set = this.serviceListeners.get(service);
      if (set) for (const listener of set) listener();
    }
    this.recomputeProgress(this.progress.isStreaming);
  }

  finish(failureDetail?: string) {
    if (failureDetail) {
      const orphans: Array<[string, ServiceResult]> = [];
      for (const service of this.serviceNames) {
        if (!this.results.has(service)) {
          orphans.push([service, { status: AvailabilityStatus.Error, detail: failureDetail }]);
        }
      }
      if (orphans.length > 0) {
        for (const [service, result] of orphans) {
          this.results.set(service, result);
          const set = this.serviceListeners.get(service);
          if (set) for (const listener of set) listener();
        }
      }
    }
    this.recomputeProgress(false);
  }

  private recomputeProgress(isStreaming: boolean) {
    let available = 0;
    let taken = 0;
    let errors = 0;
    let unknown = 0;
    for (const { status } of this.results.values()) {
      if (status === AvailabilityStatus.Available) available += 1;
      else if (status === AvailabilityStatus.Taken) taken += 1;
      else if (status === AvailabilityStatus.Unknown) unknown += 1;
      else errors += 1;
    }
    const checked = available + taken + errors + unknown;
    this.progress = {
      total: this.serviceNames.length,
      available,
      taken,
      errors,
      unknown,
      checked,
      isStreaming,
      isComplete: this.serviceNames.length > 0 && checked === this.serviceNames.length,
    };
    this.notifyProgress();
  }

  private notifyProgress() {
    for (const listener of this.progressListeners) listener();
  }
}
