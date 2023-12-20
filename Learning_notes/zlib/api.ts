// import { NextApiRequest, NextApiResponse } from 'next';

export async function fetchData(): Promise<any> {
  const response = await fetch('https://api.burmesedate.org/api/ptmksn');
  const data = await response.json();
  return data;
}

// export default function handler(req: NextApiRequest, res: NextApiResponse): void {
//   // Handle API requests here if you have an API route
//   // You can use the fetchData function or write custom logic
// }

