'use client';

import { useEffect, useState } from 'react';
import TournamentBracket from '@/app/components/bracket/TournamentBracket';
import { useParams } from 'next/navigation';
import DoubleEliminationBracket from "@/app/components/bracket/DoubleEliminationBracket";

export default function TournamentPage() {
    const { id } = useParams();

    const [teams, setTeams] = useState([]);
    const [stages, setStages] = useState([]);
    const [activeStage, setActiveStage] = useState(null);
    const [matches, setMatches] = useState([]);

    // fetch teams
    useEffect(() => {
        fetch('/api/teams/get-teams')
            .then(res => res.json())
            .then(setTeams)
            .catch(console.error);
    }, []);

    // fetch stages
    useEffect(() => {
        fetch(`/api/tournaments/${id}/stages`)
            .then(res => res.json())
            .then(data => {
                setStages(data);
                if (data.length) setActiveStage(data[0]);
            });
    }, [id]);

    // fetch matches when stage changes
    useEffect(() => {
        if (!activeStage) return;

        fetch(`/api/stages/${activeStage.id}/matches`)
            .then(res => res.json())
            .then(setMatches);
    }, [activeStage]);

    return (
        <div>
            {/* Stage content */}
            {activeStage?.stage_type === 'BRACKET' && (
                <TournamentBracket
                    tournamentID={activeStage.id}
                    matches={matches}
                    teams={teams}
                />
            )}

            {/* Future expansion */}
            {activeStage?.stage_type === 'GROUP' && (
                <div>Brak implementacji</div>
            )}

            {activeStage?.stage_type === 'DOUBLE' && (
                <DoubleEliminationBracket
                    tournamentID={activeStage.id}
                    matches={matches}
                    teams={teams}
                />
            )}
        </div>
    );
}
