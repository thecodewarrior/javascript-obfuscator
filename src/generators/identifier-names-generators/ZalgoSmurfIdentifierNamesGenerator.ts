import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';

@injectable()
export class ZalgoSmurfIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
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

    private letterS: string[] = "SŚŜŞŠȘṠṢṤṦṨꓢꞨＳsśŝşšșȿȿʂʂˢṡṣṥṧṩꜱꞩｓ".split('');
    private letterM: string[] = "MΜḾṀṂⰏⱮꓟＭmɱᵯᶆḿṁṃⰿꝳｍ".split('');
    private letterU: string[] = "UÙÚÛÜŨŪŬŮŰŲƯƱǓǕǗǙǛȔȖɄṲṴṶṸṺỤỦỨỪỬỮỰＵuùúûüũūŭůűųưǔǖǘǚǜȕȗʉʊΰυϋύߎᵾᵿᶙṳṵṷṹṻụủứừửữựὐὑὒὓὔὕὖὗὺύῠῡῢΰῦῧｕ".split('');
    private letterR: string[] = "RŔŖŘȐȒɌᚱṘṚṜṞℜⱤꞦＲrŕŗřȑȓɍɼᵣṙṛṝṟꝵꞧ".split('');
    private letterF: string[] = "FƑḞＦfƒᵮᶂḟｆ".split('');
    private letterY: string[] = "YÝŶŸƳȲɎẎỲỴỶỸꓬＹyýÿŷƴȳɏẏẙỳỵỷỹỾỿⵃｙ".split('');

    /**
     * @returns {string}
     */
    public generate (): string {
        let selectedS: string = this.letterS[Math.floor(Math.random() * this.letterS.length)];
        let selectedM: string = this.letterM[Math.floor(Math.random() * this.letterM.length)];
        let selectedU: string = this.letterU[Math.floor(Math.random() * this.letterU.length)];
        let selectedR: string = this.letterR[Math.floor(Math.random() * this.letterR.length)];
        let selectedF: string = this.letterF[Math.floor(Math.random() * this.letterF.length)];
        let selectedY: string = Math.random() < 0.5 ? "" : this.letterY[Math.floor(Math.random() * this.letterY.length)];

        let identifierName: string = selectedS + selectedM + selectedU + selectedR + selectedF + selectedY;

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
}
