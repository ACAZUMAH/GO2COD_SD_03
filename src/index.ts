import readline from 'readline';

const choices = ['rock', 'paper', 'scissors'] as const;
type Choice = typeof choices[number];

const read = async (question: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

const computerChoice = async (): Promise<Choice> => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

const compare = (player: Choice, computer: Choice): string => {
    if (player === computer) {
        return 'It\'s a tie!';
    };

    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'You win!';
    }

    return 'You lose!';
};

const main = async () => {
    let playerCount = 0;
    let computerCount = 0;
    while (true) {
        const answer = (await read("rock, paper, or scissors? (or type 'quit' to exit): ")).toLowerCase();
        if (answer === 'quit') {
            break;
        };
        if (!choices.includes(answer as Choice)) {
            console.log('Invalid choice');
            continue;
        };
        const computer = await computerChoice();
        console.log(`Computer chose ${computer}`);
        const result = compare(answer as Choice, computer);
        console.log(result);
        if (result === 'You win!') {
            playerCount++;
        } else if (result === 'You lose!') {
            computerCount++;
        };
        console.log(`Player: ${playerCount} Computer: ${computerCount}`);
    };
    console.log('Game over');
    console.log(`Final score: Player: ${playerCount} Computer: ${computerCount}`);
};

main();