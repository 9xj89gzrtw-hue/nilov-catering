"use client";

import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 10,
    color: "#6b6b6b",
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#C8782A",
    marginBottom: 20,
    paddingBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e8e4de",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0ede8",
  },
  colName: { flex: 3, fontSize: 10 },
  colWeight: { flex: 1, fontSize: 10, textAlign: "right" as const },
  colPrice: { flex: 1, fontSize: 10, textAlign: "right" as const },
  colQty: { flex: 0.5, fontSize: 10, textAlign: "center" as const },
  colTotal: { flex: 1, fontSize: 10, textAlign: "right" as const },
  tableHeaderText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#6b6b6b",
  },
  totalSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
  },
  totalText: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
  },
  accentLine: {
    backgroundColor: "#C8782A",
    height: 1,
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#6b6b6b",
    borderTopWidth: 1,
    borderTopColor: "#e8e4de",
    paddingTop: 8,
  },
});

interface MenuPDFGeneratorProps {
  items: { name: string; weight: string; price: number; quantity: number }[];
  total: number;
  title?: string;
}

export default function MenuPDFGenerator({ items, total, title }: MenuPDFGeneratorProps) {
  const formattedTotal = total.toLocaleString("ru-RU") + " \u20BD";
  const displayTitle = title || "Сформированное меню";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Nilov Catering</Text>
        <Text style={styles.subheader}>
          {displayTitle} | nilov-catering.ru | +7 (812) 919-59-11
        </Text>
        <View style={styles.divider} />

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.colName]}>Блюдо</Text>
          <Text style={[styles.tableHeaderText, styles.colWeight]}>Вес</Text>
          <Text style={[styles.tableHeaderText, styles.colPrice]}>Цена</Text>
          <Text style={[styles.tableHeaderText, styles.colQty]}>Кол.</Text>
          <Text style={[styles.tableHeaderText, styles.colTotal]}>Сумма</Text>
        </View>

        {items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colName}>{item.name}</Text>
            <Text style={styles.colWeight}>{item.weight}</Text>
            <Text style={styles.colPrice}>
              {item.price.toLocaleString("ru-RU")} \u20BD
            </Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colTotal}>
              {(item.price * item.quantity).toLocaleString("ru-RU")} \u20BD
            </Text>
          </View>
        ))}

        <View style={styles.totalSection}>
          <Text style={styles.totalText}>Итого: {formattedTotal}</Text>
        </View>
        <View style={styles.accentLine} />

        <View style={styles.footer}>
          <Text>Nilov Catering | г. Москва, ул. Тверская, д. 15</Text>
          <Text>interfood-catering@yandex.ru | +7 (812) 919-59-11</Text>
        </View>
      </Page>
    </Document>
  );
}