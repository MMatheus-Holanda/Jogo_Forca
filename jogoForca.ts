class PalavraSecreta {
    private palavraSecreta: string = ''
    private listaPalavras: string[] =
        ['foguete',
            'guitarra',
            'namorar',
            'alaska',
            'penhasco',
            'teclado',
            'chinelo',
            'psicologa',
            'estrategia',
            'musica']


    sortearPalavra(numero: number): void {
        this.palavraSecreta = this.listaPalavras[numero]
    }

    getPalavraSecreta() {
        return this.palavraSecreta
    }
}

class Jogador {
    nome: string
    placar: number = 0

    constructor(nome: string) {
        this.nome = nome;
    }
}

class JogadorHumano extends Jogador { }

class JogadorComputador extends Jogador {

    private bancoDeLetras: string[] = [
        'a', 'e', 'i', 'o', 'u', 'r', 'p', 'l', 'm', 't', 'h', 'n', 'f', 'g', 's', 'c', 'k'
    ]

    adivinharLetra(): string {
        let index = parseInt((Math.random() * 17).toFixed());
        let letra = this.bancoDeLetras[index]
        return letra
    }
}

class JogoDaForca {
    private palavraSecreta: string = ''
    protected jogadorH?: JogadorHumano
    protected jogadorPC?: JogadorComputador
    protected letrasTestadas: string[] = []
    protected tentativas: number = 0

    novoJogo(jogador: JogadorHumano | JogadorComputador, numero: number) {
        if (jogador instanceof JogadorHumano) {
            this.jogadorH = jogador
        } else {
            this.jogadorPC = jogador
        }
        const palavraSecreta = new PalavraSecreta()
        palavraSecreta.sortearPalavra(numero)
        this.palavraSecreta = palavraSecreta.getPalavraSecreta()
        this.tentativas = this.palavraSecreta.length + 6 
    }

    jogadaPlayerHumano(letra: string) {
        if (this.palavraSecreta === '') {
            console.log(`Primeiramente use a função "Novo Jogo" para começar e depois fazer uma jogada!`);
        } else if(this.tentativas == 0){
           console.log(`O numero de tentativas acabou! FIM DE JOGO!`);
        } else if (letra === this.palavraSecreta){
            console.log(`Parabéns! Você acertou a palavra ${this.palavraSecreta}!`);
        } else if (this.jogadorH && !this.letrasTestadas.includes(letra!) && letra != '') {
            if (this.palavraSecreta.includes(letra)) {
                this.jogadorH.placar += 1
                let posicao = this.palavraSecreta.indexOf(letra)
                console.log(`Numero de letras: ${this.palavraSecreta.length}`);
                console.log(`A letra ${letra} consta na posição ${posicao + 1} da palavra secreta`);
                console.log(`Placar:${this.jogadorH.placar}`);
            } else {
                console.log(`A letra ${letra.toUpperCase()} não consta na palavra secreta`);
            }
            this.letrasTestadas.push(letra)
            this.tentativas -= 1
            console.log(`Tentativas: ${this.tentativas}\nLetras Testadas: ${this.letrasTestadas}`);
        } else if (this.letrasTestadas.includes(letra!)) {
            console.log(`A letra ${letra!} ja foi testada!`);
        } else if(letra! === '') {
            console.log('Digite uma letra válida! Espaços em branco não são válidos!');
        } else {
            console.log(`Crie um player Humano para utilizar essa função!`);
        }
    }


    jogadaPlayerPC() {
        let letra: string;
        if (this.palavraSecreta === '') {
            console.log(`Primeiramente use a função "Novo Jogo" para começar e depois fazer uma jogada!`);
        } else if(this.tentativas == 0){
            console.log(`O numero de tentativas acabou! FIM DE JOGO!`);
         } else if (letra! === this.palavraSecreta){
            console.log(`Parabéns! Você acertou a palavra ${this.palavraSecreta}!`);
        }  else if (this.letrasTestadas.includes(letra!)) {
            console.log(`A letra ${letra!} ja foi testada!`);
        } else if (this.jogadorPC && !this.letrasTestadas.find((element) => element === letra)) {
            letra = this.jogadorPC!.adivinharLetra()
            if (this.palavraSecreta.includes(letra!)) {
                this.jogadorPC!.placar += 1
                let posicao = this.palavraSecreta.indexOf(letra!)
                console.log(`Numero de letras: ${this.palavraSecreta.length}`);
                console.log(`A letra ${letra.toUpperCase()} consta na posição ${posicao + 1} da palavra secreta`);
                console.log(`Placar:${this.jogadorPC.placar}`);
            } else {
                console.log(`A letra ${letra} não consta na palavra secreta`);
            }
            this.letrasTestadas.push(letra!)
            this.tentativas -= 1
            console.log(`Tentativas: ${this.tentativas}\nLetras Testadas: ${this.letrasTestadas}`);
        } else if(letra! === '') {
            console.log('Digite uma letra válida! Espaços em branco não são válidos!');
        } else {
            console.log(`Crie um player PC para utilizar essa função!`);
        }
    }
}

const matheus = new JogadorHumano('matheus');

const jogo = new JogoDaForca();
jogo.novoJogo(matheus, 9);
jogo.jogadaPlayerHumano('m');
jogo.jogadaPlayerHumano('b');
jogo.jogadaPlayerHumano('u');