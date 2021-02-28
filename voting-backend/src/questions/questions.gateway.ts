import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Question } from './schemas/question.schema';

@WebSocketGateway()
export class QuestionsGateway
    implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    users = 0;

    handleConnection(client: any) {
        this.users++;
        console.log('received Connection');
        this.server.emit('users', this.users);
    }
    handleDisconnect(): void {
        this.users--;
        console.log('Connection closed');
        this.server.emit('users', this.users);
    }

    broadCastNewQuestion(question: Question) {
        console.log('new question available');
        this.server.emit('question', question);
    }

    broadCastEditQuestion(id: any, text: string) {
        this.server.emit('edit', {id, text});
    }

    broadCastQuestionDelete(id: any) {
        this.server.emit('delete', id);
    }

    broadCastUpdatedQuestionVote(updatedQuestionId: string) {
        this.server.emit('vote', updatedQuestionId);
    }

    broadCastQuestionComplete(completedQuestionId: string) {
        this.server.emit('complete', completedQuestionId);
    }

    broadCastStartEditQuestion(id: string) {
        this.server.emit('startEdit', id);
    }
}
