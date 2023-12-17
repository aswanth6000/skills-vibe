// models/gig.ts
import { Schema, Document, model } from 'mongoose';

interface Gig {
    title: string;
    gigdescription: string;
    price: number;
    tags: string[];
    images: string[]; 
    video: string;   
}

interface GigModel extends Gig, Document {}

const gigSchema = new Schema<GigModel>({ 
    title: {
        type: String,
        required: true,
    },
    gigdescription: {
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
