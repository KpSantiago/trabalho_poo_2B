//mapeando o body
const corpo = document.querySelector("body");
//mapeando o form e a tabela
const tabela = document.querySelector("#tbody");
const form = document.querySelector("#info-produtos");
let idx = form.idx.value;
//salvar no localStorage
const atualizarLocalStorage = (produtos)=>{
    localStorage.setItem("produtos", JSON.stringify(produtos));
}
const recuperarLocalStorage = () => JSON.parse(localStorage.getItem("produtos") || "[]");

const salvarProdutos = (event)=>{
    event.preventDefault();
    const nome = form.nomeProduto.value;
    const preco = Number(form.precoProduto.value);
    const prime = form.prime.checked;
    
    if(idx == "novo"){
      //adicionando ao vetor
      /*vetor recebendo a vetor que pega os dados do
      localStorage e adicionando a ela dados de um
      objeto*/
      const produtos = recuperarLocalStorage();
      produtos.push({id:produtos.length + 1, nome, preco, prime})
      atualizarLocalStorage(produtos);
      preencherTabela();
      //resetando as informações assim que forem cadastradas
      form.reset();
    }else{
      let produto = {id: idx, nome, preco, prime};
      atualizarProduto(idx, produto)
      preencherTabela();
      form.reset()
    }
}
const preencherTabela = ()=>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = "";
    for(let produto of produtos){
      tabela.innerHTML += `
      <tr>
      <th class="tbodyTh">${produto.id}</th>
        <td>${produto.nome}</td>
        <td>${produto.preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</td>
        <td>${produto.prime ? "sim" : "Não"}</td>
        <td>
          <img src="icons/trash.svg" onclick="removerProduto(${produto.id})">
          <label for="nomeProduto"><img src="icons/edit.svg" onclick="editarProduto(${produto.id})"></label>
        </td>
        </tr>`
    }
}
const removerProduto = (id)=>{
  const produtos = recuperarLocalStorage();
  //findIndex vai procurar o id do produto
  const indexProduto = produtos.findIndex(produto=> produto.id === id)
  produtos.splice(indexProduto, 1)
  atualizarLocalStorage(produtos);
}
const editarProduto = (id)=>{
  const produtos = recuperarLocalStorage();
  const indexProduto = produtos.findIndex((index)=>index.id == id);
  form.nomeProduto.value = produtos[indexProduto].nome;
  form.precoProduto.value = produtos[indexProduto].preco;
  form.prime.checked = produtos[indexProduto].prime;
  idx = id;
}
const atualizarProduto = (id, produto)=>{
  const produtos = recuperarLocalStorage();
  const indexProduto = produtos.findIndex((index)=>index.id == id);
  produtos[indexProduto] = produto;
  atualizarLocalStorage(produtos);
  idx = "novo"
}
//EVENTOS
form.addEventListener("submit", salvarProdutos)
//evento para continuar com as informações quando o html for carregado
document.addEventListener("DOMContentLoaded", preencherTabela)
