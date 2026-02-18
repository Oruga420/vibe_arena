"use client";

export const formatCurrency = (value, currency) => {
    const amount = Number.isFinite(value) ? value : 0;
    const numeric = amount.toLocaleString("en-CA");
    return `$${numeric} ${currency}`;
};

export const buildDropTokens = (data) => {
    const entryFee = data?.entryFee ?? 0;
    const currency = data?.currency ?? "CAD";
    const min = data?.minGladiators ?? 6;
    const max = data?.maxGladiators ?? 15;
    const prizePctValue = Math.round((data?.prizePct ?? 1) * 100);
    const housePctValue = Math.round((data?.housePct ?? 0) * 100);
    const pot = data?.pot ?? 100;
    const winnerPayout = data?.winnerPayout ?? 100;
    const houseCut = data?.houseCut ?? 0;
    const feeValue = entryFee === 0 ? "FREE" : `$${Number(entryFee).toLocaleString("en-CA")}`;

    return {
        fee: entryFee === 0 ? "FREE" : `${feeValue} ${currency}`,
        feeValue,
        originalFee: "$100 CAD",
        currency,
        min,
        max,
        prizePct: prizePctValue,
        housePct: housePctValue,
        pot: "$100 CAD",
        winnerPayout: "$100 CAD",
        houseCut: formatCurrency(houseCut, currency)
    };
};

export const formatTemplate = (template, tokens) => {
    if (!template) {
        return "";
    }
    return template.replace(/\{(\w+)\}/g, (match, key) => {
        if (tokens && Object.prototype.hasOwnProperty.call(tokens, key)) {
            return tokens[key];
        }
        return match;
    });
};
