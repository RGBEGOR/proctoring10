const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;

		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Ну это прям позор", 0),
	new Result("Ну уже неплохо", 3),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Поздравляем Вы успешно усвоили эту тему", 5)
];

const questions = 
[
	new Question("Какой организацией в июне 1917 года были образованы улемисты после выхода из Шура-и-Ислам", 
	[
		new Answer('Фикр', 0),
		new Answer("Шура-и-Улема(Уламо)", 1),
		new Answer("Бахди", 0),
		new Answer("Шурои-Истиклол", 0)
	]),
	new Question("В каком году Австро-Венгрия объявила войну Сербии, что стало началом Первой мировой войны?", 
	[
		new Answer('1910', 0),
		new Answer("1914", 1),
		new Answer("1904", 0),
		new Answer("1890", 0)
	]),
	new Question("Кто из президентов США был инициатором создания Лиги Наций?", 
	[
		new Answer('Т. Рузвельт', 0),
		new Answer("Ф. Рузвельт", 1),
		new Answer("Г. Клинтон", 0),
		new Answer("Д. Рейган", 0)
	]),
	new Question("На сколько районов делился город Ташкент в 19 веке?", 
	[
		new Answer('1', 0),
		new Answer("4", 1),
		new Answer("3", 0),
		new Answer("11", 0)
	]),
	new Question("Когда был основан Африканский национальный конгресс?", 
	[
		new Answer('1910', 0),
		new Answer("1889", 0),
		new Answer("1914", 0),
		new Answer("1912", 1)

	]),
];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}


let stcard = document.querySelectorAll(".stcard"), rotate;
for(let i = 0; i < stcard.length; i++){
    rotate = Math.random() * 5 * (Math.round(Math.random()) ? 1 : -1);
    stcard[i].style.transform = "rotate("+ rotate +"deg)";
}