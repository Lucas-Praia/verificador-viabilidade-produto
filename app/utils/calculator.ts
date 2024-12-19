export interface VariableSet {
    name: string;
    coefficients: number[];
    constraints: number[];
    limit: number;
}

export function calculateViability(variables: VariableSet): {
    isViable: boolean;
    equations: string[];
    totalValue: number;
} {
    let totalValue = 0;
    const equations: string[] = [];

    // Calculate the sum of coefficients * constraints
    for (let i = 0; i < variables.coefficients.length; i++) {
        if (variables.coefficients[i] && variables.constraints[i]) {
            totalValue += variables.coefficients[i] * variables.constraints[i];
            equations.push(
                `${variables.coefficients[i]} × ${variables.constraints[i]} = ${
                    variables.coefficients[i] * variables.constraints[i]
                }`
            );
        }
    }

    return {
        isViable: totalValue <= variables.limit,
        equations,
        totalValue,
    };
}

