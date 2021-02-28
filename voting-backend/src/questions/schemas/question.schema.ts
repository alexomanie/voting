import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {

        @Prop({ required: true })
    text: string;

    @Prop({ default: 0 })
    votes: number;

    @Prop({ default: false })
    complete: boolean;

    @Prop({default: false})
    edited: boolean;

    @Prop({ default: Date.now })
    created: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
