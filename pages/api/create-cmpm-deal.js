import { createCMPMDeal } from '../../helpers/utils';

export default async function handler(req, res) {
  const { contactId, title } = req.body;

  const deal = await createCMPMDeal(contactId, title);
  return res.status(200).json({ data: deal });
}
