/*
 * @Author: tohsaka888
 * @Date: 2022-09-05 13:38:42
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-09 16:13:18
 * @Description: 请填写简介
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'
import { ObjectId } from 'mongodb'

/**
 * @openapi
 * /api/competition/delete:
 *   post:
 *     description: 删除比赛
 *     requestBody:
 *       description: 请求体
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               id: "xxxxxxxxxxxxxx"
 *     responses:
 *       200:
 *         description: 返回列表
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
    const body: { ids: string[] } = req.body
    if (db) {
      if (body) {
        const competition = db.collection('competition')
        await competition.deleteMany({ _id: { $in: body.ids.map((id: string) => new ObjectId(id)) } })
      }
      res.status(200).json({ success: true, isDeleted: true })
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(200).json({ success: false, error: (error as Error).message })
  }
}