/*
 * @Author: tohsaka888
 * @Date: 2022-09-05 10:39:32
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-05 10:39:33
 * @Description: 请填写简介
 */

import { clientPromise } from "./clientPromise"

export const connectDB = async () => {
  const connection = await clientPromise
  return connection.db('cxy-home')
}