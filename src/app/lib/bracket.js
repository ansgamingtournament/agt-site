export function groupMatches(matches) {
    const leftR16 = matches.filter(m => m.round_number === 1 && m.bracket_position <= 8);
    const rightR16 = matches.filter(m => m.round_number === 1 && m.bracket_position > 8);

    const leftR8 = matches.filter(m => m.round_number === 2 && m.bracket_position <= 4);
    const rightR8 = matches.filter(m => m.round_number === 2 && m.bracket_position > 4);

    const leftR4 = matches.filter(m => m.round_number === 3 && m.bracket_position <= 2);
    const rightR4 = matches.filter(m => m.round_number === 3 && m.bracket_position > 2);

    const leftSemi = matches.filter(
        m => m.round_number === 4 && m.bracket_position === 1
    );

    const rightSemi = matches.filter(
        m => m.round_number === 4 && m.bracket_position === 2
    );

    return {
        left: {
            r16: fillRoundSlots(leftR16, 8, 'left', 1),
            r8: fillRoundSlots(leftR8, 4, 'left', 2),
            r4: fillRoundSlots(leftR4, 2, 'left', 3),
            semifinal: fillRoundSlots(leftSemi, 1, 'left', 4),
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
            semifinal: fillRoundSlots(
                rightSemi.map(m => ({ ...m, bracket_position: 1 })),
                1,
                'right',
                4
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
            });
        }
    }

    return slots;
}
