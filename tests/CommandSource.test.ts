import { describe, it, expect } from '@jest/globals';
import { CommandSource } from '../src/CommandSource';
import { LocalTransport } from '../src/LocalTransport';

interface Payload {
	data: number;
}
interface MyCommand extends Payload {
	source: string;
}

describe('CommandSource', () => {
	it('automatically adds source and returns response', async () => {
		const transport = new LocalTransport<MyCommand, string>();
		const src = new CommandSource<MyCommand, string>('UnitTest', transport);

		transport.on(async (cmd) => `Received ${cmd.data} from ${cmd.source}`);

		const result = await src.trigger({ data: 123 });
		expect(result).toBe('Received 123 from UnitTest');
	});
});
