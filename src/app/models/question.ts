import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;
    hint: string;
    isHintRequired: boolean;
    attempts: number;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        this.hint = data.hint;
        this.isHintRequired = data.isHintRequired || false;
        this.attempts = data.attempts || 0;

        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
