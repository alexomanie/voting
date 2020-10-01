import { Module } from '@nestjs/common';
import { QuestionsGateway } from './questions.gateway';
import { QuestionSchema, Question } from './schemas/question.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Question.name, schema: QuestionSchema },
        ]),
    ],
    controllers: [QuestionsController],
    providers: [QuestionsGateway, QuestionsService],
})
export class QuestionsModule {}
