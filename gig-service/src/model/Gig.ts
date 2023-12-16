// models/gig.ts
import { Schema, Document, model } from 'mongoose';

interface Gig {
    title: string;
    description: string;
    price: number;
    tags: string[];
    images: string[]; // Array of image URLs or file paths
    video: string;    // Video URL or file path
}

interface GigModel extends Gig, Document {}

const gigSchema = new Schema<GigModel>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    images: {
        type: [String],
        default: [],
    },
    video: {
        type: String, 
        default: '',
    },
});

const GigModel = model<GigModel>('Gig', gigSchema);

export default GigModel;
