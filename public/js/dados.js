import { dadosNotasFiscais } from './dadosNotas.js';

document.addEventListener('DOMContentLoaded', function () {
    const statusAll = {
        '1': 'Emitida',
        '2': 'Cobrança realizada',
        '3': 'Pagamento em atraso',
        '4': 'Pagamento realizado',
    };

    function montarTabela(dadosSelect = null) {
        const tabelaCorpo = document.getElementById('tabelaCorpo');
        
        let dadosNotas = 0;
        
        if (dadosSelect !== null) {
            
            dadosNotas = dadosSelect;
        } else {
            
            dadosNotas = dadosNotasFiscais;
        }

        tabelaCorpo.innerHTML = '';

        dadosNotas.forEach(function (nota) {
            const linha = document.createElement('tr');

            const celulaNome = document.createElement('td');
            celulaNome.textContent = nota.nomePagador;
            linha.appendChild(celulaNome);

            const celulaIdentificacao = document.createElement('td');
            celulaIdentificacao.textContent = nota.identificacaoNota;
            linha.appendChild(celulaIdentificacao);

            const celulaEmissao = document.createElement('td');
            celulaEmissao.textContent = nota.dataEmissaoNota;
            linha.appendChild(celulaEmissao);

            const celulaCobranca = document.createElement('td');
            celulaCobranca.textContent = nota.dataCobranca;
            linha.appendChild(celulaCobranca);

            const celulaPagamento = document.createElement('td');
            celulaPagamento.textContent = nota.dataPagamento || 'N/A';
            linha.appendChild(celulaPagamento);

            const celulaValor = document.createElement('td');
            celulaValor.textContent = nota.valorNota.toFixed(2);
            linha.appendChild(celulaValor);

            const celulaDocumentoFiscal = document.createElement('td');
            celulaDocumentoFiscal.textContent = nota.documentoNotaFiscal;
            linha.appendChild(celulaDocumentoFiscal);

            const celulaBoletoBancario = document.createElement('td');
            celulaBoletoBancario.textContent = nota.documentoBoletoBancario;
            linha.appendChild(celulaBoletoBancario);

            const celulaStatus = document.createElement('td');
            celulaStatus.textContent = nota.statusNota;
            linha.appendChild(celulaStatus);

            tabelaCorpo.appendChild(linha);
        });
    }

    montarTabela();


    const btnBuscar = document.getElementById('btnBuscar');

    btnBuscar.addEventListener('click', function () {
        // Resgatar os valores dos selects
        const emissao = document.getElementById('emissao').value;
        const cobranca = document.getElementById('cobranca').value;
        const pagamento = document.getElementById('pagamento').value;
        const status = statusAll[document.getElementById('status').value];
       
        let resultado = [];
        if (emissao === '' && cobranca === '' && pagamento === '' && status === undefined) {
            resultado = dadosNotasFiscais;
            
        } else {
            
            resultado = consultarDados(emissao, cobranca, pagamento, status);
        }
        
        montarTabela(resultado);
    });

    function consultarDados(emissao, cobranca, pagamento, status) {
        const resultadoConsulta = [];

        // Filtrar os dados com base nos parâmetros
        const dadosFiltrados = dadosNotasFiscais.filter(nota => {
            if (emissao && formatarDataMes(nota.dataEmissaoNota) !== emissao) {

                return false;
            }

            if (cobranca && formatarDataMes(nota.dataCobranca) !== cobranca) {
                
                return false;
            }

            if (pagamento && formatarDataMes(nota.dataPagamento) !== pagamento) {
                console.log(cobranca)
                console.log(nota.dataPagamento)
                return false;
            }

            if (status && nota.statusNota !== status) {
                return false;
            }

            return true;
        });

        // Construir o resultado da consulta
        dadosFiltrados.forEach(nota => {
            resultadoConsulta.push({
                nomePagador: nota.nomePagador,
                identificacaoNota: nota.identificacaoNota,
                dataEmissaoNota: nota.dataEmissaoNota,
                dataCobranca: nota.dataCobranca,
                dataPagamento: nota.dataPagamento,
                valorNota: nota.valorNota,
                documentoNotaFiscal: nota.documentoNotaFiscal,
                documentoBoletoBancario: nota.documentoBoletoBancario,
                statusNota: nota.statusNota
            });
        });
        
        return resultadoConsulta;
    }

    function formatarDataMes(dataString) {
        const data = new Date(dataString);
    const numeroMes = (data.getMonth() + 1).toString();
    return numeroMes;
}
});