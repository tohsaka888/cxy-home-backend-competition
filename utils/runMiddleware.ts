/*
 * @Author: tohsaka888
 * @Date: 2022-09-05 10:41:33
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-05 10:41:33
 * @Description: 请填写简介
 */

// Helper method to wait for a middleware to execute before continuing

import { NextApiRequest, NextApiResponse } from "next"

// And to throw an error when an error happens in a middleware
export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
