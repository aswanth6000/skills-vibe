// models/gig.ts
import { Schema, Document, model } from 'mongoose';
import { Gig } from '../types/gigTypes';


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
