const willGoList = document.querySelector('#willgo');
const maybeList = document.querySelector('#maybe');
const messagesList = document.querySelector('#messages');

const IPAdress = '195.200.26.210';
// const IPAdress = 'localhost';

const $username = document.querySelector('#username');
// const userId = 66261470;

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
const userId = params.userId;
console.log(typeof userId);

const guestData = await fetch(`http://${IPAdress}:3000/guests/${userId}`);
const guest = await guestData.json();
$username.innerHTML = guest.firstName || guest.lastName || guest.username || 'friend';
console.log(guest);

const willGoGuestsData = await fetch(`http://${IPAdress}:3000/guests/willgo`);
const willGoGuestsArr = await willGoGuestsData.json();
console.log(willGoGuestsArr);

const maybeGuestsData = await fetch(`http://${IPAdress}:3000/guests/maybe`);
const maybeGuestsArr = await maybeGuestsData.json();
console.log(maybeGuestsArr);

const messagesData = await fetch(`http://${IPAdress}:3000/messages`);
const messagesArr = await messagesData.json();
console.log(messagesArr);

const generateListItemMarkUp = (guest) => {
	return `<li>
		<div>
			<img src="${guest.userPicHref}" width="60" height="60">
			<i>${guest.firstName}</i> <b>${guest.username}</b> <i>${guest.lastName}</i>
		</div>
	</li>`
};

willGoList.innerHTML = willGoGuestsArr.map(generateListItemMarkUp).join('');
maybeList.innerHTML = maybeGuestsArr.map(generateListItemMarkUp).join('');

messagesList.innerHTML = messagesArr.map((message) => {
	return `<li>
		<div>
			<img src="${message.userPicHref}" width="60" height="60">
			<i>${message.firstName}</i> <b>${message.username}</b> <i>${message.lastName}</i>
		</div>
		<p>${message.message}</p>
	</li>`
}).join('');

