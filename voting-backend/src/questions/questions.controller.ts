import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    Delete,
} from '@nestjs/common';
import { Question } from './schemas/question.schema';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, EditQuestionDto } from './dtos/create-question.dto';
import { QuestionsGateway } from './questions.gateway';
import { UpdateVotesDto } from './dtos/update-votes.dto';

@Controller('api/v1/questions')
export class QuestionsController {
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly questionsGateway: QuestionsGateway,
    ) {}

    @Post()
    async create(@Body() createQuestionDto: CreateQuestionDto) {
        const newQuestion = await this.questionsService.create(
            createQuestionDto,
        );
        this.questionsGateway.broadCastNewQuestion(newQuestion);
    }

    @Put(':id')
    async editQuestion(@Param('id') id, @Body() payload: EditQuestionDto) {
        console.log(id);
        await this.questionsService.editQuestion(id, payload.text);
        this.questionsGateway.broadCastEditQuestion(id, payload.text);
    }

    @Put(':id/votes')
    async updateVotes(@Param('id') id) {
        console.log(id);
        const updatedQuestion = await this.questionsService.updateVotes(id);
        console.log(updatedQuestion);
        this.questionsGateway.broadCastUpdatedQuestionVote(id);
    }

    @Put(':id/complete')
    async complete(@Param('id') id) {
        const completedQuestion = await this.questionsService.complete(id);
        console.log(completedQuestion);
        this.questionsGateway.broadCastQuestionComplete(id);
    }

    @Delete(':id')
    async deleteQuestion(@Param('id') id) {
        await this.questionsService.delete(id);
        this.questionsGateway.broadCastQuestionDelete(id);
    }

    @Get()
    async findAll(): Promise<Question[]> {
        return this.questionsService.findAll();
    }
}
