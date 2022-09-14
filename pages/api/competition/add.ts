/*
 * @Author: tohsaka888
 * @Date: 2022-09-05 13:38:42
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-14 10:05:23
 * @Description: 请填写简介
 */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@utils/connectDB'
import Cors from 'cors'
import { runMiddleware } from '@utils/runMiddleware'

/**
 * @openapi
 * /api/competition/add:
 *   post:
 *     description: 创建比赛
 *     requestBody:
 *       description: 请求体
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: "测试竞赛"
 *               createdTime: "2022-02-02 20:22:22"
 *               intro: "介绍"
 *               participants: []
 *               winners: []
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


export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await runMiddleware(req, res, cors)
    const db = await connectDB()
    const body: { competition: API.Competition } = req.body
    if (db) {
      if (body.competition) {
        const competition = db.collection('competition')
        await competition.insertOne({ ...body.competition })
        res.status(200).json({ success: true, isCreated: true })
      } else {
        res.status(200).json({ success: false, error: '比赛不能为空' })
      }
    } else {
      new Error('连接数据库失败')
    }
  } catch (error) {
    res.status(200).json({ success: false, error: (error as Error).message })
  }
}