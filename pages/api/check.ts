import { NextApiRequest, NextApiResponse } from 'next';

import { NicknameCheckerService } from '~/services/NicknameCheckerService';
import rateLimit from '~/utils/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export const check = async (req: NextApiRequest, res: NextApiResponse) => {
  await limiter.check(res, 1000, 'CACHE_TOKEN'); // 10 requests per minute

  const { nick, service } = req.query;

  if (!nick || !service) {
    return res.status(400).json({ error: 'Missing nick or service' });
  }

  if (typeof nick !== 'string' || typeof service !== 'string') {
    return res.status(400).json({ error: 'Invalid nick or service' });
  }

  const isAvailable = await NicknameCheckerService.checkIfAvailableInService(
    nick,
    service
  );

  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json(isAvailable);
};

export default check;
