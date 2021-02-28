import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from 'src/questions/schemas/question.schema';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dtos/create-question.dto';

@Injectable()
export class QuestionsService {


    constructor(
        @InjectModel(Question.name) private questionModel: Model<Question>,
    ) {}

    async create(createCatDto: CreateQuestionDto): Promise<Question> {
        const newQuestion = new this.questionModel(createCatDto);
        return newQuestion.save();
    }

    async editQuestion(id: any, text: string) {
        await this.questionModel.updateOne({ _id: id }, { text: text, edited: false });
    }

    async findAll(): Promise<Question[]> {
        return this.questionModel.find().exec();
    }

    async updateVotes(id: string) {
        await this.questionModel.updateOne({ _id: id }, { $inc: { votes: 1 } });
        return this.questionModel.findById(id).exec();
    }

    async delete(id: any) {
        return await this.questionModel.findByIdAndDelete(id).exec();
    }

    async complete(id: string) {
        await this.questionModel.updateOne({ _id: id }, { complete: true });
        return this.questionModel.findById(id).exec();
    }

    async startEdit(id: any) {
        await this.questionModel.updateOne({ _id: id }, { edited: true });
        return this.questionModel.findById(id).exec();
    }
}
