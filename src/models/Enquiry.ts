import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IEnquiry extends Document {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  read: boolean
  createdAt: Date
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    phone:   { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry ?? mongoose.model<IEnquiry>('Enquiry', EnquirySchema)
export default Enquiry
