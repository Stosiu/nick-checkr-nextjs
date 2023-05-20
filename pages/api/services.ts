import { NextApiRequest, NextApiResponse } from 'next';

import { NicknameCheckersService } from '~/services/nickname-checkers';

export const services = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.status(200).json(NicknameCheckersService.getServicesNames());
};

export default services;
