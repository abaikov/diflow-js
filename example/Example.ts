import { CommandSource } from '../src/CommandSource';
import { LocalTransport } from '../src/LocalTransport';
import {
	TCreateDeckCommand,
	TCreateDeckResponse,
	ECommandType,
} from './CreateDeckCommand';

const source = new CommandSource<TCreateDeckCommand, TCreateDeckResponse>(
	'Modal',
	new LocalTransport(),
);

source.registerHandler(async (cmd) => {
	console.log(`[LOCAL HANDLER] ${cmd.payload.name}`);
	return { newDeckId: 777 };
});

(async () => {
	const result = await source.trigger({
		type: ECommandType.CreateDeck,
		payload: { name: 'Physics' },
	});
	console.log('Local created deck ID:', result.newDeckId);
})();
