"use client"

import React, { useState } from 'react'
import { calculateViability, type VariableSet } from './utils/calculator'

export default function VerificadorViabilidade() {
    const [produto, setProduto] = useState('')
    const [coeficientes, setCoeficientes] = useState(['', '', ''])
    const [restricoes, setRestricoes] = useState(['', '', ''])
    const [limite, setLimite] = useState('')
    const [resultado, setResultado] = useState<{
        isViable: boolean;
        equations: string[];
        totalValue: number;
    } | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const variables: VariableSet = {
            name: produto,
            coefficients: coeficientes.map(c => Number(c)),
            constraints: restricoes.map(r => Number(r)),
            limit: Number(limite)
        }

        const result = calculateViability(variables)
        setResultado(result)
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Verificador de Viabilidade - {produto || 'Novo Produto'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label htmlFor="produto" style={{ display: 'block', marginBottom: '5px' }}>Nome do Produto</label>
                    <input
                        id="produto"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            color: '#000' // Define apenas a cor da fonte como preta
                        }}
                        value={produto}
                        onChange={(e) => setProduto(e.target.value)}
                        placeholder="Ex: COMPUTADOR ou BOLSAS"
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <h3 style={{ marginBottom: '10px' }}>Coeficientes</h3>
                        {coeficientes.map((coef, index) => (
                            <div key={`coef-${index}`} style={{ marginBottom: '10px' }}>
                                <label htmlFor={`coef-${index}`} style={{ display: 'block', marginBottom: '5px' }}>X{index + 1}</label>
                                <input
                                    id={`coef-${index}`}
                                    type="number"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        color: '#000' // Define apenas a cor da fonte como preta
                                    }}
                                    value={coef}
                                    onChange={(e) => {
                                        const novosCoefs = [...coeficientes]
                                        novosCoefs[index] = e.target.value
                                        setCoeficientes(novosCoefs)
                                    }}
                                    placeholder={`Coeficiente X${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>

                    <div>
                        <h3 style={{ marginBottom: '10px' }}>Restrições</h3>
                        {restricoes.map((restricao, index) => (
                            <div key={`restricao-${index}`} style={{ marginBottom: '10px' }}>
                                <label htmlFor={`restricao-${index}`} style={{ display: 'block', marginBottom: '5px' }}>Restrição {index + 1}</label>
                                <input
                                    id={`restricao-${index}`}
                                    type="number"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        color: '#000' // Define apenas a cor da fonte como preta
                                    }}
                                    value={restricao}
                                    onChange={(e) => {
                                        const novasRestricoes = [...restricoes]
                                        novasRestricoes[index] = e.target.value
                                        setRestricoes(novasRestricoes)
                                    }}
                                    placeholder={`Valor da restrição ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="limite" style={{ display: 'block', marginBottom: '5px' }}>Limite</label>
                    <input
                        id="limite"
                        type="number"
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            color: '#000' // Define apenas a cor da fonte como preta
                        }}
                        value={limite}
                        onChange={(e) => setLimite(e.target.value)}
                        placeholder="Valor limite"
                        required
                    />
                </div>

                <button type="submit" style={{
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    color: 'white',
                    padding: '15px 32px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                }}>
                    Verificar Viabilidade
                </button>
            </form>

            {resultado && (
                <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <h3 style={{ marginBottom: '10px' }}>Resultado da Análise</h3>
                    <div>
                        <p>Equações:</p>
                        <ul style={{ paddingLeft: '20px' }}>
                            {resultado.equations.map((eq, i) => (
                                <li key={i}>{eq}</li>
                            ))}
                        </ul>
                        <p>Valor Total: {resultado.totalValue}</p>
                        <p>Limite: {limite}</p>
                        <p style={{ fontWeight: 'bold', color: resultado.isViable ? 'green' : 'red' }}>
                            Resultado: {resultado.isViable ? 'Viável' : 'Não Viável'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
