"use client";

export const formatCurrency = (value, currency) => {
    const amount = Number.isFinite(value) ? value : 0;
    const numeric = amount.toLocaleString("en-CA");
    return `$${numeric} ${currency}`;
};

export const buildDropTokens = (data) => {
    const entryFee = data?.entryFee ?? 0;
    const currency = data?.currency ?? "CAD";
    const min = data?.minGladiators ?? 8;
    const max = data?.maxGladiators ?? 10;
    const prizePctValue = Math.round((data?.prizePct ?? 1) * 100);
    const housePctValue = Math.round((data?.housePct ?? 0) * 100);
    const potValue = data?.pot ?? 0;
    const winnerPayoutValue = data?.winnerPayout ?? 0;
    const houseCut = data?.houseCut ?? 0;
    const feeValue = entryFee === 0 ? "FREE" : `$${Number(entryFee).toLocaleString("en-CA")}`;

    return {
        fee: entryFee === 0 ? "FREE" : `${feeValue} ${currency}`,
        feeValue,
        originalFee: entryFee === 0 ? null : formatCurrency(entryFee, currency),
        currency,
        min,
        max,
        prizePct: prizePctValue,
        housePct: housePctValue,
        pot: potValue === 0 ? "FREE" : formatCurrency(potValue, currency),
        winnerPayout: winnerPayoutValue === 0 ? "$500 CASH" : formatCurrency(winnerPayoutValue, currency),
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
