import { StatusError } from '../../../answers/errorStatus';

export function isSqlInjection(input: string): void {
    const sqlInjectionPatterns = [
        /SELECT\s.*\sFROM\s/i,
        /UNION\sALL\sSELECT\s/i,
        /INSERT\sINTO\s/i,
        /DELETE\sFROM\s/i,
        /UPDATE\s.*\sSET\s/i,
        /DROP\sTABLE\s/i,
        /--\s*$/i,
        /;\s*$/i,
        /\bOR\b\s+\b1\b\s*=\s*1\b/i,
        /\bAND\b\s+\b1\b\s*=\s*1\b/i,
        /\bEXEC\b\s/i,
        /\bEXECUTE\b\s/i,
        /\bTRUNCATE\b\s/i,
        /\bCALL\b\s/i,
        /\bREPLACE\b\s/i,
        /\bALTER\b\s/i,
        /\bCREATE\b\s/i
    ];

    for (const pattern of sqlInjectionPatterns) {
        if (pattern.test(input)) {
            throw new StatusError('Potential SQL injection detected', 400);
        }
    }
}

export function isScriptInjection(input: string): void {
    const scriptInjectionPatterns = [
        /<script\b/i,
        /<\/script\b/i
    ];

    for (const pattern of scriptInjectionPatterns) {
        if (pattern.test(input)) {
            throw new StatusError('Potential script injection detected', 400);
        }
    }
}

export function isNumber(input: string | number, paramName: string | null): void {
    if (typeof input === 'number') {
        return;
    }
    
    const converted = Number(input);
    if (isNaN(converted)) {
        throw new StatusError(`Invalid parameter ${paramName}`, 400);
    }
}