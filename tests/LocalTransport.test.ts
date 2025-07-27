import { describe, it, expect } from '@jest/globals';
import { LocalTransport } from '../src/LocalTransport';

interface MyCommand {
	source: string;
	payload: string;
}

describe('LocalTransport', () => {
	it('delivers command to registered handler and returns response', async () => {
		const transport = new LocalTransport<MyCommand, string>();

		transport.on(async (cmd) => `Hello, ${cmd.payload} from ${cmd.source}`);

		const response = await transport.send({
			source: 'test',
			payload: 'world',
		});

		expect(response).toBe('Hello, world from test');
	});

	it('throws error when no handler registered', async () => {
		const transport = new LocalTransport<MyCommand, string>();

		await expect(
			transport.send({ source: 'none', payload: 'foo' }),
		).rejects.toThrow('No handler registered');
	});
});
