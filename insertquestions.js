const mysql = require('mysql2');
const pool = require('./database');

// Array of questions and choices
const data = [
    // {
    //     question: 'What is the longest word in the English language?',
    //     choices: [
    //         { text: 'Antidisestablishmentarianism', isCorrect: true },
    //         { text: 'Hippopotomonstrosesquippedaliophobia', isCorrect: false },
    //         { text: 'Floccinaucinihilipilification', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the name of the world’s smallest horse?',
    //     choices: [
    //         { text: 'Falabella', isCorrect: true },
    //         { text: 'Shetland pony', isCorrect: false },
    //         { text: 'Miniature horse', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is Benedictine monk Dom Pierre Pérignon rumored to have created?',
    //     choices: [
    //         { text: 'Tomato ketchup', isCorrect: false },
    //         { text: 'Champagne', isCorrect: true },
    //         { text: 'French fries', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country drinks the most amount of coffee per person?',
    //     choices: [
    //         { text: 'Finland', isCorrect: true },
    //         { text: 'Italy', isCorrect: false },
    //         { text: 'Colombia', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the collective name for a group of unicorns?',
    //     choices: [
    //         { text: 'A sparkle', isCorrect: false },
    //         { text: 'A spell', isCorrect: false },
    //         { text: 'A blessing', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What is the most common color of toilet paper in France?',
    //     choices: [
    //         { text: 'Pink', isCorrect: true },
    //         { text: 'White', isCorrect: false },
    //         { text: 'Blue', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many years old is the world’s oldest piece of chewing gum?',
    //     choices: [
    //         { text: '100', isCorrect: false },
    //         { text: '2,500', isCorrect: false },
    //         { text: '5,700', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'How many times per day does the average American open their fridge?',
    //     choices: [
    //         { text: '5', isCorrect: false },
    //         { text: '22', isCorrect: true },
    //         { text: '33', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What color is an airplane’s famous black box?',
    //     choices: [
    //         { text: 'Red', isCorrect: false },
    //         { text: 'Orange', isCorrect: true },
    //         { text: 'Black', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is Bombay Duck’s main ingredient?',
    //     choices: [
    //         { text: 'Fish', isCorrect: true },
    //         { text: 'Duck', isCorrect: false },
    //         { text: 'Chicken', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many tails does a Manx cat have?',
    //     choices: [
    //         { text: 'None', isCorrect: true },
    //         { text: 'One', isCorrect: false },
    //         { text: 'Two', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'On a boat, what is the opposite of port?',
    //     choices: [
    //         { text: 'Bow', isCorrect: false },
    //         { text: 'Starboard', isCorrect: true },
    //         { text: 'Deck', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who invented the bikini?',
    //     choices: [
    //         { text: 'Louis Vuitton', isCorrect: false },
    //         { text: 'Coco Chanel', isCorrect: false },
    //         { text: 'Louis Reard', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'As of July 2023, how many episodes of South Park are there?',
    //     choices: [
    //         { text: '250', isCorrect: false },
    //         { text: '300', isCorrect: false },
    //         { text: '325', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In what decade was Madonna born?',
    //     choices: [
    //         { text: '1950s', isCorrect: true },
    //         { text: '1960s', isCorrect: false },
    //         { text: '1970s', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In what language is the phrase ‘Hakuna Matata’?',
    //     choices: [
    //         { text: 'Dutch', isCorrect: false },
    //         { text: 'Swahili', isCorrect: true },
    //         { text: 'Yoruba', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'And what is the meaning of ‘Hakuna Matata’?',
    //     choices: [
    //         { text: 'No worries', isCorrect: true },
    //         { text: 'Goodnight', isCorrect: false },
    //         { text: 'Thank you', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is King Charles III’s surname?',
    //     choices: [
    //         { text: 'Arthur', isCorrect: false },
    //         { text: 'Wales', isCorrect: false },
    //         { text: 'Mountbatten-Windsor', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What is the name of a duel with three people involved?',
    //     choices: [
    //         { text: 'A triage', isCorrect: false },
    //         { text: 'A truel', isCorrect: true },
    //         { text: 'A tryst', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many stars are on the United States flag?',
    //     choices: [
    //         { text: '50', isCorrect: true },
    //         { text: '51', isCorrect: false },
    //         { text: '52', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In which year was Slido founded?',
    //     choices: [
    //         { text: '2012', isCorrect: true },
    //         { text: '2016', isCorrect: false },
    //         { text: '2020', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who is credited with inventing the World Wide Web?',
    //     choices: [
    //         { text: 'Steve Jobs', isCorrect: false },
    //         { text: 'Bill Gates', isCorrect: false },
    //         { text: 'Tim Berners-Lee', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What type of computer was the first laptop computer?',
    //     choices: [
    //         { text: 'Apple Macintosh', isCorrect: false },
    //         { text: 'IBM PC', isCorrect: false },
    //         { text: 'Osborne 1', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What is the largest social media network in the world?',
    //     choices: [
    //         { text: 'Twitter', isCorrect: false },
    //         { text: 'Facebook', isCorrect: true },
    //         { text: 'Instagram', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who is considered the founder of modern computer science?',
    //     choices: [
    //         { text: 'Alan Turing', isCorrect: true },
    //         { text: 'Steve Jobs', isCorrect: false },
    //         { text: 'Bill Gates', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'The website Info.cern.ch is famous for what function?',
    //     choices: [
    //         { text: 'Being the predecessor for Wikipedia', isCorrect: false },
    //         { text: 'Being the world’s very first website', isCorrect: true },
    //         { text: 'Being the world’s first ever search engine', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What year was the iPhone first released in?',
    //     choices: [
    //         { text: '2007', isCorrect: true },
    //         { text: '2009', isCorrect: false },
    //         { text: '2010', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which video game console, first released in 2006, was the first to use motion controls during gameplay?',
    //     choices: [
    //         { text: 'Sega Megadrive', isCorrect: false },
    //         { text: 'Nintendo Wii', isCorrect: true },
    //         { text: 'Playstation', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'When was eBay founded?',
    //     choices: [
    //         { text: '1990', isCorrect: false },
    //         { text: '1995', isCorrect: true },
    //         { text: '2001', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'A green owl is the mascot for which app?',
    //     choices: [
    //         { text: 'Spotify', isCorrect: false },
    //         { text: 'Tinder', isCorrect: false },
    //         { text: 'Duolingo', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In which year did the Berlin Wall fall?',
    //     choices: [
    //         { text: '1987', isCorrect: false },
    //         { text: '1989', isCorrect: true },
    //         { text: '1990', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many times has the Mona Lisa been stolen?',
    //     choices: [
    //         { text: 'One', isCorrect: true },
    //         { text: 'Five', isCorrect: false },
    //         { text: 'Eight', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In Ancient Rome, how many days of the week were there?',
    //     choices: [
    //         { text: 'Five', isCorrect: false },
    //         { text: 'Six', isCorrect: false },
    //         { text: 'Eight', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What was New York’s original name?',
    //     choices: [
    //         { text: 'New Liverpool', isCorrect: false },
    //         { text: 'New Amsterdam', isCorrect: true },
    //         { text: 'New Brussels', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In what year did the Titanic sink?',
    //     choices: [
    //         { text: '1900', isCorrect: false },
    //         { text: '1912', isCorrect: true },
    //         { text: '1921', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Until 1981, Greenland was a colony of which country?',
    //     choices: [
    //         { text: 'France', isCorrect: false },
    //         { text: 'Spain', isCorrect: false },
    //         { text: 'Denmark', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'How many US presidents have been assassinated?',
    //     choices: [
    //         { text: 'Three', isCorrect: false },
    //         { text: 'Four', isCorrect: true },
    //         { text: 'Five', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the modern name for the island formerly known as Van Diemen’s Land?',
    //     choices: [
    //         { text: 'The Isle of Wight', isCorrect: false },
    //         { text: 'Tasmania', isCorrect: true },
    //         { text: 'Hawaii', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who was assassinated in New York in 1980?',
    //     choices: [
    //         { text: 'President John F Kennedy', isCorrect: false },
    //         { text: 'John Lennon', isCorrect: true },
    //         { text: 'Gianni Versace', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who painted The Last Supper?',
    //     choices: [
    //         { text: 'Leonardo Da Vinci', isCorrect: true },
    //         { text: 'Rembrandt', isCorrect: false },
    //         { text: 'Michelangelo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country does this flag belong to?',
    //     choices: [
    //         { text: 'The Isle of Man', isCorrect: false },
    //         { text: 'Wales', isCorrect: true },
    //         { text: 'Jersey', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which famous singer is this?',
    //     choices: [
    //         { text: 'Adam Ant', isCorrect: false },
    //         { text: 'Sam Smith', isCorrect: false },
    //         { text: 'Justin Timberlake', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which sporting event is this?',
    //     choices: [
    //         { text: 'The Grand Prix', isCorrect: false },
    //         { text: 'The Grand National', isCorrect: true },
    //         { text: 'The Superbowl', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which famous composer is this?',
    //     choices: [
    //         { text: 'Wolfgang Amadeus Mozart', isCorrect: false },
    //         { text: 'Ludwig van Beethoven', isCorrect: true },
    //         { text: 'Johann Sebastian Bach', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country is this?',
    //     choices: [
    //         { text: 'Spain', isCorrect: false },
    //         { text: 'Portugal', isCorrect: true },
    //         { text: 'San Marino', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which city is this?',
    //     choices: [
    //         { text: 'Rotterdam', isCorrect: false },
    //         { text: 'Porto', isCorrect: true },
    //         { text: 'Palermo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What breed of dog is this?',
    //     choices: [
    //         { text: 'Poodle', isCorrect: false },
    //         { text: 'Pomeranian', isCorrect: true },
    //         { text: 'Chihuahua', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What type of flower is this?',
    //     choices: [
    //         { text: 'Lily', isCorrect: false },
    //         { text: 'Rose', isCorrect: false },
    //         { text: 'Tulip', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which tech innovator is this as a baby?',
    //     choices: [
    //         { text: 'Jeff Bezos', isCorrect: false },
    //         { text: 'Mark Zuckerberg', isCorrect: false },
    //         { text: 'Larry Page', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which girl band is this?',
    //     choices: [
    //         { text: 'Destiny’s Child', isCorrect: true },
    //         { text: 'Sugababes', isCorrect: false },
    //         { text: 'En Vogue', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who wrote the epic poem Paradise Lost?',
    //     choices: [
    //         { text: 'William Shakespeare', isCorrect: false },
    //         { text: 'John Milton', isCorrect: true },
    //         { text: 'Mary Shelley', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many original James Bond novels were published?',
    //     choices: [
    //         { text: '12', isCorrect: true },
    //         { text: '15', isCorrect: false },
    //         { text: '21', isCorrect: false }
    //     ]
    // },
    // {
    //     question: '"Magnum opus" is a Latin phrase for what in literature?',
    //     choices: [
    //         { text: 'A love story', isCorrect: false },
    //         { text: 'An author\'s best work', isCorrect: true },
    //         { text: 'A tragedy', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who wrote Lolita?',
    //     choices: [
    //         { text: 'Anton Chekov', isCorrect: false },
    //         { text: 'Leo Tolstoy', isCorrect: false },
    //         { text: 'Vladimir Nabokov', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What was the bestselling book in the US in 2022?',
    //     choices: [
    //         { text: 'It Ends With Us by Colleen Hoover', isCorrect: true },
    //         { text: 'Where the Crawdads Sing by Delia Owens', isCorrect: false },
    //         { text: 'The Light We Carry by Michelle Obama', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many novels did Roald Dahl write?',
    //     choices: [
    //         { text: 'Seven', isCorrect: false },
    //         { text: 'Eleven', isCorrect: false },
    //         { text: 'Nineteen', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Where is Emily Bronte’s novel Wuthering Heights set?',
    //     choices: [
    //         { text: 'Yorkshire', isCorrect: true },
    //         { text: 'London', isCorrect: false },
    //         { text: 'Paris', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which author is the bestselling female author of all time, having sold two billion books?',
    //     choices: [
    //         { text: 'J.K. Rowling', isCorrect: false },
    //         { text: 'Agatha Christie', isCorrect: true },
    //         { text: 'Enid Blyton', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What was the first book ever ordered on Amazon?',
    //     choices: [
    //         { text: 'Don Quixote', isCorrect: false },
    //         { text: 'The Bible', isCorrect: false },
    //         { text: 'Fluid Concepts and Creative Analogies: Computer Models of the Fundamental Mechanisms of Thought', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Who is the female protagonist in The Hunger Games?',
    //     choices: [
    //         { text: 'Hermione Granger', isCorrect: false },
    //         { text: 'Nancy Drew', isCorrect: false },
    //         { text: 'Katniss Everdeen', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In what country was the Caesar salad invented?',
    //     choices: [
    //         { text: 'The US', isCorrect: false },
    //         { text: 'Poland', isCorrect: false },
    //         { text: 'Mexico', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'What was the first fruit to be eaten on the Moon?',
    //     choices: [
    //         { text: 'Grapes', isCorrect: false },
    //         { text: 'A peach', isCorrect: true },
    //         { text: 'A starfruit', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the primary ingredient in hummus?',
    //     choices: [
    //         { text: 'Black beans', isCorrect: false },
    //         { text: 'Edamame beans', isCorrect: false },
    //         { text: 'Chickpeas', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In which Italian city was pizza first made?',
    //     choices: [
    //         { text: 'Naples', isCorrect: true },
    //         { text: 'Rome', isCorrect: false },
    //         { text: 'Palermo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What are the top two most exported spices used in the world?',
    //     choices: [
    //         { text: 'Pepper and mustard', isCorrect: false },
    //         { text: 'Ginger and cinnamon', isCorrect: true },
    //         { text: 'Mustard and oregano', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which country has the most Michelin starred restaurants?',
    //     choices: [
    //         { text: 'India', isCorrect: false },
    //         { text: 'France', isCorrect: true },
    //         { text: 'Japan', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Where were French fries invented?',
    //     choices: [
    //         { text: 'France', isCorrect: false },
    //         { text: 'Belgium', isCorrect: true },
    //         { text: 'The US', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which is the only food that cannot go off – and can actually last forever?',
    //     choices: [
    //         { text: 'Peanut butter', isCorrect: false },
    //         { text: 'Honey', isCorrect: true },
    //         { text: 'Demerara sugar', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which fast food restaurant has the most branches in the world?',
    //     choices: [
    //         { text: 'McDonald’s', isCorrect: false },
    //         { text: 'Wendy’s', isCorrect: false },
    //         { text: 'Subway', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which country has the most number of vegetarian citizens?',
    //     choices: [
    //         { text: 'United Kingdom', isCorrect: false },
    //         { text: 'Brazil', isCorrect: false },
    //         { text: 'India', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which musical genre originated in Jamaica in the 1960s?',
    //     choices: [
    //         { text: 'Salsa', isCorrect: false },
    //         { text: 'Reggae', isCorrect: true },
    //         { text: 'Flamenco', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which instrument is associated with jazz legend Louis Armstrong?',
    //     choices: [
    //         { text: 'Trumpet', isCorrect: true },
    //         { text: 'Saxophone', isCorrect: false },
    //         { text: 'Piano', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which singer is known as the "Queen of Soul"?',
    //     choices: [
    //         { text: 'Aretha Franklin', isCorrect: true },
    //         { text: 'Diana Ross', isCorrect: false },
    //         { text: 'Whitney Houston', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which singer-songwriter released the album "21" in 2011?',
    //     choices: [
    //         { text: 'Adele', isCorrect: true },
    //         { text: 'Taylor Swift', isCorrect: false },
    //         { text: 'Beyoncé', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many Spice Girls were there in the original lineup?',
    //     choices: [
    //         { text: 'Four', isCorrect: false },
    //         { text: 'Five', isCorrect: true },
    //         { text: 'Six', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who composed the famous ballet, Swan Lake?',
    //     choices: [
    //         { text: 'Stravinsky', isCorrect: false },
    //         { text: 'Tchaikovsky', isCorrect: true },
    //         { text: 'Prokofiev', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which band released the album "Rumors" in 1977?',
    //     choices: [
    //         { text: 'Fleetwood Mac', isCorrect: true },
    //         { text: 'The Rolling Stones', isCorrect: false },
    //         { text: 'Queen', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Who was the best-selling musical artist in the US in 2022?',
    //     choices: [
    //         { text: 'Justin Bieber', isCorrect: false },
    //         { text: 'Drake', isCorrect: true },
    //         { text: 'Taylor Swift', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Farrokh Bulsara was the real name of which singing legend?',
    //     choices: [
    //         { text: 'Jimi Hendrix', isCorrect: false },
    //         { text: 'Marc Bolan', isCorrect: false },
    //         { text: 'Freddie Mercury', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'Which artist has won the most Grammys, at 32?',
    //     choices: [
    //         { text: 'Tina Turner', isCorrect: false },
    //         { text: 'Beyoncé', isCorrect: true },
    //         { text: 'Eminem', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many bones does an adult human have?',
    //     choices: [
    //         { text: '200', isCorrect: false },
    //         { text: '206', isCorrect: true },
    //         { text: '216', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the smallest unit of matter?',
    //     choices: [
    //         { text: 'Atom', isCorrect: true },
    //         { text: 'Cell', isCorrect: false },
    //         { text: 'Molecule', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the primary gas that makes up the Earth’s atmosphere?',
    //     choices: [
    //         { text: 'Oxygen', isCorrect: false },
    //         { text: 'Nitrogen', isCorrect: true },
    //         { text: 'Carbon dioxide', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which of the following can’t an astronaut do in space?',
    //     choices: [
    //         { text: 'Cry', isCorrect: true },
    //         { text: 'Sleep', isCorrect: false },
    //         { text: 'Read', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What is the hardest natural substance on planet Earth?',
    //     choices: [
    //         { text: 'Gold', isCorrect: false },
    //         { text: 'Diamond', isCorrect: true },
    //         { text: 'Platinum', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which planet has 145 moons?',
    //     choices: [
    //         { text: 'Saturn', isCorrect: true },
    //         { text: 'Mars', isCorrect: false },
    //         { text: 'Mercury', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'How many bones do sharks have in their body?',
    //     choices: [
    //         { text: 'Zero', isCorrect: true },
    //         { text: '52', isCorrect: false },
    //         { text: '152', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which part of the human body has the most sweat glands?',
    //     choices: [
    //         { text: 'The armpit', isCorrect: false },
    //         { text: 'Feet', isCorrect: true },
    //         { text: 'Hands', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What color is the sunset on Mars?',
    //     choices: [
    //         { text: 'Red', isCorrect: false },
    //         { text: 'Pink', isCorrect: false },
    //         { text: 'Blue', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'How many humans have walked on the Moon?',
    //     choices: [
    //         { text: '12', isCorrect: true },
    //         { text: '14', isCorrect: false },
    //         { text: '18', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In which country was the game of chess invented?',
    //     choices: [
    //         { text: 'India', isCorrect: true },
    //         { text: 'China', isCorrect: false },
    //         { text: 'Greece', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which scientist invented penicillin?',
    //     choices: [
    //         { text: 'Alexander Fleming', isCorrect: true },
    //         { text: 'Alexander Graham Bell', isCorrect: false },
    //         { text: 'Thomas Edison', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Which hair product was invented in 1950?',
    //     choices: [
    //         { text: 'Hair spray', isCorrect: true },
    //         { text: 'Hair straighteners', isCorrect: false },
    //         { text: 'Shampoo', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'When was the world’s first ATM introduced, in Enfield, UK?',
    //     choices: [
    //         { text: '1967', isCorrect: true },
    //         { text: '1977', isCorrect: false },
    //         { text: '1987', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'Where were Venetian blinds invented?',
    //     choices: [
    //         { text: 'Persia', isCorrect: true },
    //         { text: 'Italy', isCorrect: false },
    //         { text: 'Scotland', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'In which ancient civilization were scissors invented?',
    //     choices: [
    //         { text: 'Ancient Egypt', isCorrect: true },
    //         { text: 'Ancient Rome', isCorrect: false },
    //         { text: 'Ancient Greece', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'When was the first ever SMS text message sent?',
    //     choices: [
    //         { text: '1987', isCorrect: false },
    //         { text: '1990', isCorrect: false },
    //         { text: '1992', isCorrect: true }
    //     ]
    // },
    // {
    //     question: 'In which year was the first submarine built, by Dutch engineer Cornelis Jacobszoon Drebbel?',
    //     choices: [
    //         { text: '1620', isCorrect: true },
    //         { text: '1750', isCorrect: false },
    //         { text: '1850', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What was the world’s first postage stamp, issued in the United Kingdom in 1840 called?',
    //     choices: [
    //         { text: 'Penny Farthing', isCorrect: false },
    //         { text: 'Penny Black', isCorrect: true },
    //         { text: 'Penny Red', isCorrect: false }
    //     ]
    // },
    // {
    //     question: 'What did Charles Babbage famously invent?',
    //     choices: [
    //         { text: 'The computer', isCorrect: true },
    //         { text: 'The microwave', isCorrect: false },
    //         { text: 'The television', isCorrect: false }
    //     ]
    // },
    // Continue adding other questions in the same format
];

// Function to insert a question and its choices
const insertData = async () => {
    try {
        for (const item of data) {
            // Insert the question and get the inserted id
            const [result] = await pool.promise().query('INSERT INTO Questions (question_text) VALUES (?)', [item.question]);
            const questionId = result.insertId;

            // Insert all choices for the question
            for (const choice of item.choices) {
                await pool.promise().query('INSERT INTO Choices (question_id, choice_text, is_correct) VALUES (?, ?, ?)', [
                    questionId,
                    choice.text,
                    choice.isCorrect
                ]);
            }
        }
        console.log('All data inserted successfully.');
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        pool.end();  // Close the pool
    }
};

insertData();
