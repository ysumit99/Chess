let initialBoard = [
    {
        "id": "a8",
        "blockColor": "W",
        "piece": "BR"
    },
    {
        "id": "b8",
        "blockColor": "B",
        "piece": "BN"
    },
    {
        "id": "c8",
        "blockColor": "W",
        "piece": "BB"
    },
    {
        "id": "d8",
        "blockColor": "B",
        "piece": "BQ"
    },
    {
        "id": "e8",
        "blockColor": "W",
        "piece": "BK"
    },
    {
        "id": "f8",
        "blockColor": "B",
        "piece": "BB"
    },
    {
        "id": "g8",
        "blockColor": "W",
        "piece": "BN"
    },
    {
        "id": "h8",
        "blockColor": "B",
        "piece": "BR"
    },
    {
        "id": "a7",
        "blockColor": "B",
        "piece": "BP"
    },
    {
        "id": "b7",
        "blockColor": "W",
        "piece": "BP"
    },
    {
        "id": "c7",
        "blockColor": "B",
        "piece": "BP"
    },
    {
        "id": "d7",
        "blockColor": "W",
        "piece": "BP"
    },
    {
        "id": "e7",
        "blockColor": "B",
        "piece": "BP"
    },
    {
        "id": "f7",
        "blockColor": "W",
        "piece": "BP"
    },
    {
        "id": "g7",
        "blockColor": "B",
        "piece": "BP"
    }, {
        "id": "h7",
        "blockColor": "W",
        "piece": "BP"
    },
    {
        "id": "a6",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "b6",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "c6",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "d6",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "e6",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "f6",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "g6",
        "blockColor": "W",
        "piece": "XX"
    }, {
        "id": "h6",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "a5",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "b5",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "c5",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "d5",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "e5",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "f5",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "g5",
        "blockColor": "B",
        "piece": "XX"
    }, {
        "id": "h5",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "a4",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "b4",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "c4",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "d4",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "e4",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "f4",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "g4",
        "blockColor": "W",
        "piece": "XX"
    }, {
        "id": "h4",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "a3",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "b3",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "c3",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "d3",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "e3",
        "blockColor": "B",
        "piece": "XX"
    },
    {
        "id": "f3",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "g3",
        "blockColor": "B",
        "piece": "XX"
    }, {
        "id": "h3",
        "blockColor": "W",
        "piece": "XX"
    },
    {
        "id": "a2",
        "blockColor": "W",
        "piece": "WP"
    },
    {
        "id": "b2",
        "blockColor": "B",
        "piece": "WP"
    },
    {
        "id": "c2",
        "blockColor": "W",
        "piece": "WP"
    },
    {
        "id": "d2",
        "blockColor": "B",
        "piece": "WP"
    },
    {
        "id": "e2",
        "blockColor": "W",
        "piece": "WP"
    },
    {
        "id": "f2",
        "blockColor": "B",
        "piece": "WP"
    },
    {
        "id": "g2",
        "blockColor": "W",
        "piece": "WP"
    }, {
        "id": "h2",
        "blockColor": "B",
        "piece": "WP"
    },
    {
        "id": "a1",
        "blockColor": "B",
        "piece": "WR"
    },
    {
        "id": "b1",
        "blockColor": "W",
        "piece": "WN"
    },
    {
        "id": "c1",
        "blockColor": "B",
        "piece": "WB"
    },
    {
        "id": "d1",
        "blockColor": "W",
        "piece": "WQ"
    },
    {
        "id": "e1",
        "blockColor": "B",
        "piece": "WK"
    },
    {
        "id": "f1",
        "blockColor": "W",
        "piece": "WB"
    },
    {
        "id": "g1",
        "blockColor": "B",
        "piece": "WN"
    },
    {
        "id": "h1",
        "blockColor": "W",
        "piece": "WR"
    }
];

export default initialBoard;