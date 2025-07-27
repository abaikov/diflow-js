import { describe, it, expect } from '@jest/globals';
import { LocalQueryTransport } from '../src/LocalQueryTransport';

interface MyQuery {
	term: string;
}

describe('LocalQueryTransport', () => {
	it('delivers query to handler and returns response', async () => {
		const transport = new LocalQueryTransport<MyQuery, number>();
		transport.on(async (query) => query.term.length);
		const result = await transport.send({ term: 'hello' });
		expect(result).toBe(5);
	});

	it('throws error when no handler registered', async () => {
		const transport = new LocalQueryTransport<MyQuery, number>();
		await expect(transport.send({ term: 'oops' })).rejects.toThrow(
			'No handler registered',
		);
	});
});
