import { MONGODB_DATABASE_NAME, MONGODB_URI } from '../config'
import mongoose, { connection } from 'mongoose'

/**
 * Initialize MongoDB
 */
export async function initMongodb(): Promise<void> {
  // Optional chaining: connection is not defined for in-memory mongodb
  connection?.on('connected', () => {
    console.log('MongoDB connected')
  })

  // Optional chaining: connection is not defined for in-memory mongodb
  connection?.on('error', (error) => {
    console.error('MongoDB connection error:', error)
  })

  await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DATABASE_NAME,
  })
}

/**
 * Disconnect from MongoDB
 */
export async function mongodbDisconnect(): Promise<void> {
  await mongoose.disconnect()
}
