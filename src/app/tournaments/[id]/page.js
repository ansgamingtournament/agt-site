'use client';

import { useEffect, useState } from 'react';
import TournamentBracket from '@/app/components/bracket/TournamentBracket';

import { useParams } from 'next/navigation';

export default function TournamentPage({ params }) {
    const { id } = useParams();
    const [matches, setMatches] = useState([]);

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        async function fetchTeams() {
            try {
                const res = await fetch('/api/teams/get-teams');
                const data = await res.json();
                setTeams(data);
            } catch (err) {
                console.error('Failed to fetch teams', err);
            }
        }

        fetchTeams();
    }, []);

    useEffect(() => {
        fetch(`/api/tournaments/${id}/bracket`)
            .then(res => res.json())
            .then(setMatches);
    }, [id]);

    return <TournamentBracket tournamentID={id} matches={matches} teams={teams} />;
}
