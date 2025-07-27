import { describe, it, expect } from '@jest/globals';
import { QueryBus } from '../src/QueryBus';
import { LocalQueryTransport } from '../src/LocalQueryTransport';

interface MyQuery {
	value: number;
}

describe('QueryBus', () => {
	it('triggers query and gets response', async () => {
		const transport = new LocalQueryTransport<MyQuery, string>();
		const bus = new QueryBus<MyQuery, string>(transport);
		bus.registerHandler(async (query) => `Value: ${query.value}`);

		const response = await bus.trigger({ value: 42 });
		expect(response).toBe('Value: 42');
	});
});
