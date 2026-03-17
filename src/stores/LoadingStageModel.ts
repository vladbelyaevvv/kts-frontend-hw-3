import { action, computed, makeObservable, observable } from 'mobx';

export enum LoadingStage {
    notStarted = 'notStarted',
    loading = 'loading',
    success = 'success',
    error = 'error',
}

export class LoadingStageModel {
    stage: LoadingStage = LoadingStage.notStarted;
    errorMessage: string = '';

    constructor(){
        makeObservable(this, {
            stage: observable,
            errorMessage: observable,
            isSuccess: computed,
            isError: computed,
            isLoading: computed,
            isNotStarted: computed,
            start: action,
            success: action,
            error: action,
            reset: action,
        });
    }

    get isSuccess(): boolean {
        return this.stage === LoadingStage.success;
    }

    get isError(): boolean {
        return this.stage === LoadingStage.error;
    }

    get isLoading(): boolean {
        return this.stage === LoadingStage.loading;
    }

    get isNotStarted(): boolean {
        return this.stage === LoadingStage.notStarted;
    }

    start() {
        this.stage = LoadingStage.loading;
        this.errorMessage = '';
    }

    success() {
        this.stage = LoadingStage.success;
    }

    error(message?: string) {
        this.stage = LoadingStage.error;
        this.errorMessage = message ?? 'Произошла ошибка';
    }

    reset() {
        this.stage = LoadingStage.notStarted;
        this.errorMessage = '';
    }
}