function categoriaSelecionada() {
    let categoriaSelecionada = $state({name:''});

    return {
      get valor() {
        return categoriaSelecionada;
      },
      set valor(novoValor) {categoriaSelecionada = novoValor},
      
    };
  }

 export const catSelecionada = categoriaSelecionada()