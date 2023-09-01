if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}
var totaCarrinho = "0,00"

function ready(){
    const removeProtudoButtons=document.getElementsByClassName("remove-produto-buton")
    console.log(removeProtudoButtons)
    for (var i = 0; i < removeProtudoButtons.length; i ++){
        removeProtudoButtons[i].addEventListener("click", removeProdutos)
    }

    const quantidadeInput = document.getElementsByClassName("produto-qtd-input")
    for (var i = 0; i < quantidadeInput.length; i++){
        quantidadeInput[i].addEventListener("change", updateTotal)
    }

    const addToCartButtons=document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addToCartButtons.length; i++){
        addToCartButtons[i].addEventListener("click", addProdutoToCard)
    }

    const buttonFinalizar = document.getElementsByClassName("button-finalizar")[0]
    buttonFinalizar.addEventListener("click", makeFinalizar)
}

function makeFinalizar(){
    if (totaCarrinho == "0,00"){
        alert("Seu carrinho está vazio!")
    }else{
        alert(
            `
                Obrigado pela sua compra!
                Valor do pedido: R$${totaCarrinho}
                Volte sempre :)

            `
        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}

function checkIfInprtIsNull(event){
    if (event.target.value == "0"){
        event.target.parentElement.parentElement.remove()
    }
    updateTotal()
}

function addProdutoToCard(event){
    const button = event.target
    const produtoInfo = button.parentElement.parentElement
    const produtoImage = produtoInfo.getElementsByClassName("produto-image")[0].src
    const produtoTitle = produtoInfo.getElementsByClassName("produto-title")[0].innerText
    const produtoPrice = produtoInfo.getElementsByClassName("produto-price")[0].innerText

    const produtosCartName = document.getElementsByClassName("cart-produto-title")
    for (var i = 0; i < produtosCartName.length; i++){
        if (produtosCartName[i].innerText == produtoTitle){
            produtosCartName[i].parentElement.parentElement.getElementsByClassName("produto-qtd-input")[0].value++
            return
        }
    }
    //console.log(produtoPrice)
    let newCardProduto = document.createElement("tr")
    newCardProduto.classList.add("cart-produto")
    newCardProduto.innerHTML =
    `
        <td class="produto-identification">
            <img class="cart-produto-image" src="${ produtoImage}" alt="${ produtoTitle }">
            <strong class="cart-produ"> ${ produtoTitle }</strong>
        </td>
        <td>
            <span class="cart-produto-price">${produtoPrice}</span>
        </td>
        <td>
            <input class="produto-qtd-input" type="number" value="1" min="0">
            <button class="remove-produto-buton" type="button">Remover</button>
        </td>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCardProduto)
    updateTotal()
    newCardProduto.getElementsByClassName("produto-qtd-input")[0].addEventListener("change", updateTotal)
    newCardProduto.getElementsByClassName("remove-produto-buton")[0].addEventListener("click", removeProdutos)
}

function removeProdutos(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}




function updateTotal(){
    totaCarrinho = 0
    const cartProduto = document.getElementsByClassName("cart-produto")
    for (var i = 0; i < cartProduto.length; i++){
       // console.log(cartProduto[i])
        const produtoPrice = cartProduto[i].getElementsByClassName("cart-produto-price")[0].innerText.replace("R$", "").replace(",", ".")
        const produtoQuantidade = cartProduto[i].getElementsByClassName("produto-qtd-input")[0].value
        //console.log(produtoPrice)
    
        totaCarrinho += (produtoPrice * produtoQuantidade)
    }
    totaCarrinho = totaCarrinho.toFixed(2)
    document.querySelector(".cart-total-cantainer span").innerText = "R$" + totaCarrinho
}
