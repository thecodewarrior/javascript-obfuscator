import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';

@injectable()
export class SmurfIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {Set<string>}
     */
    private readonly randomVariableNameSet: Set <string> = new Set();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @returns {string}
     */
    public generate (): string {
        let identifierName: string = this.randomlySwap("smurf", "SMURF")[0];
        if (Math.random() < 0.5) { // smurfy
            if (Math.random() < 0.5) {
                identifierName += "y";
            } else {
                identifierName += "Y";
            }
        }

        if (this.randomVariableNameSet.has(identifierName)) {
            return this.generate();
        }

        this.randomVariableNameSet.add(identifierName);

        return identifierName;
    }

    /**
     * @returns {string}
     */
    public generateWithPrefix (): string {
        const identifierName: string = this.generate();

        return `${this.options.identifiersPrefix}${identifierName}`.replace('__', '_');
    }

    private randomlySwap (a: string, b: string): string[] {
        const listA: string[] = a.split('');
        const listB: string[] = b.split('');
        const listOutA: string[] = [];
        const listOutB: string[] = [];

        for (let i: number = 0; i < listA.length; i++) {
            const swap: boolean = Math.random() < 0.5;
            listOutA.push(swap ? listB[i] : listA[i]);
            listOutB.push(swap ? listA[i] : listB[i]);
        }

        return [
            listOutA.join(''),
            listOutB.join('')
        ];
    }
}
