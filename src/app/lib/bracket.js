export function groupMatches(matches) {
    const leftR16 = matches.filter(m => m.round_number === 1 && m.bracket_position <= 8);
    const rightR16 = matches.filter(m => m.round_number === 1 && m.bracket_position > 8);

    const leftR8 = matches.filter(m => m.round_number === 2 && m.bracket_position <= 4);
    const rightR8 = matches.filter(m => m.round_number === 2 && m.bracket_position > 4);

    const leftR4 = matches.filter(m => m.round_number === 3 && m.bracket_position <= 2);
    const rightR4 = matches.filter(m => m.round_number === 3 && m.bracket_position > 2);

    return {
        left: {
            r16: fillRoundSlots(leftR16, 8, 'left', 1),
            r8: fillRoundSlots(leftR8, 4, 'left', 2),
            r4: fillRoundSlots(leftR4, 2, 'left', 3),
        },
        right: {
            r16: fillRoundSlots(
                rightR16.map(m => ({ ...m, bracket_position: m.bracket_position - 8 })),
                8,
                'right',
                1
            ),
            r8: fillRoundSlots(
                rightR8.map(m => ({ ...m, bracket_position: m.bracket_position - 4 })),
                4,
                'right',
                2
            ),
            r4: fillRoundSlots(
                rightR4.map(m => ({ ...m, bracket_position: m.bracket_position - 2 })),
                2,
                'right',
                3
            ),
        },
        final: matches.find(m => m.round_number === 5) ?? {
            id: null,
            side: 'center',
            round_number: 5,
            bracket_position: 1,
            team_a_id: null,
            team_b_id: null,
            team_a_name: null,
            team_b_name: null,
            winner_id: null,
            start_date: null,
            team_a_result: 0,
            team_b_result: 0,
        }
    };
}


function fillRoundSlots(existing, totalSlots, side, round_number) {
    const slots = [];

    for (let i = 1; i <= totalSlots; i++) {
        const match = existing.find(m => m.bracket_position === i);

        if (match) {
            slots.push(match);
        } else {
            slots.push({
                id: null,
                side,
                round_number,
                bracket_position: i,
                team_a_id: null,
                team_b_id: null,
                team_a_name: null,
                team_b_name: null,
                winner_id: null,
                start_date: null,
                team_a_result: 0,
                team_b_result: 0,
            });
        }
    }

    return slots;
}

export function groupDoubleEliminationMatches(matches) {

    const upper = {
        r1: fillRoundSlots(
            matches.filter(m => m.bracket === 'upper' && m.round_number === 1),
            4,
            'upper',
            1
        ),
        r2: fillRoundSlots(
            matches.filter(m => m.bracket === 'upper' && m.round_number === 2),
            2,
            'upper',
            2
        ),
        final: fillRoundSlots(
            matches.filter(m => m.bracket === 'upper' && m.round_number === 3),
            1,
            'upper',
            3
        ),
    };

    const lower = {
        r1: fillRoundSlots(
            matches.filter(m => m.bracket === 'lower' && m.round_number === 1),
            2,
            'lower',
            1
        ),
        r2: fillRoundSlots(
            matches.filter(m => m.bracket === 'lower' && m.round_number === 2),
            2,
            'lower',
            2
        ),
        r3: fillRoundSlots(
            matches.filter(m => m.bracket === 'lower' && m.round_number === 3),
            1,
            'lower',
            3
        ),
        final: fillRoundSlots(
            matches.filter(m => m.bracket === 'lower' && m.round_number === 4),
            1,
            'lower',
            4
        ),
    };

    const grandFinal = matches.find(m => m.bracket === 'grand');

    return {
        upper,
        lower,
        grandFinal: grandFinal ?? {
            id: null,
            bracket: 'grand',
            round_number: 1,
            bracket_position: 1,
            team_a_id: null,
            team_b_id: null,
            team_a_name: null,
            team_b_name: null,
            winner_id: null,
            start_date: null,
            team_a_result: 0,
            team_b_result: 0,
        }
    };
}
