// This entire file comes from @sanity-typed/test-utils
// https://github.com/saiichihashimoto/sanity-typed
// This is necessary because comparing types with Vitest doesn't work as expected.
// For deeply nested types, Vitest only checks the first few levels, which is not ideal.
// The solution in this file seems to be a more robust aproach.

/* eslint-disable @typescript-eslint/no-explicit-any */
import type {ConditionalExcept, Simplify} from 'type-fest';

// TODO Release expect-type as it's own package

declare const EXPECTED: unique symbol;
declare const RECEIVED: unique symbol;

type Negate<Value extends boolean> = Value extends true ? false : true;

// https://twitter.com/mattpocockuk/status/1646452585006604291
type StrictEqual<Expected, Received> = (<T>() => T extends Expected ? 1 : 2) extends <
	T
>() => T extends Received ? 1 : 2
	? true
	: false;

type StrictDiff<Expected, Received> = StrictEqual<Expected, Received> extends true
	? never
	: Expected extends boolean | number | string | null | undefined
	? {
			[EXPECTED]: Expected;
			[RECEIVED]: Received;
	  }
	: Expected extends (infer ExpectedItem)[]
	? Received extends (infer ReceivedItem)[]
		? StrictEqual<Expected, Received> extends true
			? never
			: StrictDiff<ExpectedItem, ReceivedItem>[]
		: {
				[EXPECTED]: Expected;
				[RECEIVED]: Received;
		  }
	: Expected extends {[key in infer ExpectedKey extends string]?: any}
	? Received extends {[key in infer ReceivedKey extends string]?: any}
		? StrictEqual<Expected, Received> extends true
			? never
			: Simplify<
					ConditionalExcept<
						{
							[key in ExpectedKey | ReceivedKey]: key extends ExpectedKey
								? key extends ReceivedKey
									? StrictDiff<Expected[key], Received[key]>
									: {
											[EXPECTED]: Expected[key];
									  }
								: {
										[RECEIVED]: Received[key & ReceivedKey];
								  };
						},
						never
					>
			  >
		: {
				[EXPECTED]: Expected;
				[RECEIVED]: Received;
		  }
	: {
			[EXPECTED]: Expected;
			[RECEIVED]: Received;
	  };

type ToStrictEqual<Expected, Received, Inverted extends boolean> = StrictEqual<
	Expected,
	Received
> extends Negate<Inverted>
	? any
	: StrictEqual<Received, any> extends true
	? // Typescript can only create errors when a type mismatch occurs, which is why TypeMatchers has Received extends ToStrictEqual<Expected, Received, Inverted>
	  // The is generally fine, unless Received is `any`, because it can be assigned to anything.
	  // Anything except `never`.
	  never
	: {
			[EXPECTED]: Expected;
			[RECEIVED]: Received;
	  };

type AssignableTo<Expected, Received> = [Expected] extends [Received] ? true : false;

type ToBeAssignableTo<Expected, Received, Inverted extends boolean> = AssignableTo<
	Expected,
	Received
> extends Negate<Inverted>
	? any
	: StrictEqual<Received, any> extends true
	? // Typescript can only create errors when a type mismatch occurs, which is why TypeMatchers has Received extends ToStrictEqual<Expected, Received, Inverted>
	  // The is generally fine, unless Received is `any`, because it can be assigned to anything.
	  // Anything except `never`.
	  never
	: {
			[EXPECTED]: Expected;
			[RECEIVED]: Received;
	  };

// https://twitter.com/mattpocockuk/status/1625173887590842369
declare const inverted: unique symbol;

type TypeMatchers<Expected, Inverted extends boolean = false> = {
	[inverted]: Inverted;
	/** Inverse next matcher. If you know how to test something, .not lets you test its opposite. */
	not: TypeMatchers<Expected, Negate<Inverted>>;
	/**
	 * Checks if Expected is assignable to Received.
	 *
	 * @example
	 * ```typescript
	 * // Equivalent Checks:
	 * expectType<typeof a>().toBeAssignableTo<B>();
	 *
	 * const something: B = a;
	 * ```
	 */
	toBeAssignableTo: <Received extends ToBeAssignableTo<Expected, Received, Inverted>>() => void;
	/**
	 * Checks if Expected and Received are exactly the same type.
	 *
	 * @link https://twitter.com/mattpocockuk/status/1646452585006604291
	 */
	toStrictEqual: <Received extends ToStrictEqual<Expected, Received, Inverted>>() => StrictDiff<
		Expected,
		Received
	> extends never
		? void
		: StrictDiff<Expected, Received>;
};

export const expectType = <Expected>() => {
	const valWithoutNot: Omit<TypeMatchers<Expected>, typeof inverted | 'not'> = {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		toBeAssignableTo: () => {},
		toStrictEqual: <Received>() =>
			undefined as unknown as StrictDiff<Expected, Received> extends never
				? void
				: StrictDiff<Expected, Received>,
	};

	const val = valWithoutNot as TypeMatchers<Expected>;
	val.not = val as unknown as typeof val.not;

	return val;
};
