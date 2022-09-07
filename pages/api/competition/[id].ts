/*
 * @Author: tohsaka888
 * @Date: 2022-09-07 11:09:36
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-07 11:09:37
 * @Description: 请填写简介
 */

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from 'utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * paths:
 *   /api/competition/{id}:
 *     get:
 *       description: 获取比赛简单列表
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           example: 630c28a9738c38ca68927c8a
 *           schema:
 *              type: string
 *       responses:
 *         200:
 *           description: 返回比赛详情
 *               
 */

 const cors = Cors({
  methods: ['POST', 'GET', 'HEAD',],
  origin: '*',
  preflightContinue: true
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors)
    const db = await connectDB()
    const query = req.query
    if (db) {
      const competitionCollection = db.collection('competition')
      const competition = await competitionCollection.findOne({ _id: new ObjectId(query.id as string) })
      res.status(200).json({ success: true, competition })
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
}
