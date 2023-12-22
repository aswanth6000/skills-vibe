// models/gig.ts
import { Schema, Document, model } from 'mongoose';

interface Gig {
    title: string;
    gigdescription: string;
    price: number;
    tags: string;
    image1: string; 
    image2: string; 
    image3: string; 
    video: string;   
    userId: string;
    status: boolean;
    refId: string;
}

interface GigModel extends Gig, Document {}

const gigSchema = new Schema<GigModel>({ 
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: false
    },
    refId: {
        type: String,
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
        type: String,
    },
    image1: {
        type: String,

    },
    image2: {
        type: String,

    },
    image3: {
        type: String,

    },
    video: {
        type: String, 
        default: '',
    },
});

const GigModel = model<GigModel>('Gig', gigSchema);

export default GigModel;
