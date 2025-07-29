import { StyleSheet } from "react-native";
import { moderateScale } from "../../utils/deviceConfig";
import { getDeviceHeight, getDeviceWidth } from "../../utils/helper";

export const styles = StyleSheet.create({
    bottomSheetStyle: {
        borderWidth: 1,
        paddingHorizontal: moderateScale(16),
        borderColor: '#EEEEEE',
        height: 'auto',
        alignSelf: 'center',
        paddingVertical: moderateScale(16),
    },
    sheetTitle: {
        fontSize: moderateScale(22),
        fontWeight: '700',
        color: '#000',
        textAlign: 'center',
        marginBottom: moderateScale(16),
    },
    dividerLine: {
        marginLeft: -moderateScale(16),
        height: 2,
        backgroundColor: '#EEEEEE',
        width: getDeviceWidth() * 1
    },
    sectionTitle: {
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: '#000',
        marginVertical: moderateScale(12),
    },
    chipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(8),
        marginBottom: moderateScale(12),
    },
    chip: {
        borderWidth: 1,
        borderColor: '#041C45',
        borderRadius: moderateScale(24),
        paddingHorizontal: moderateScale(14),
        paddingVertical: moderateScale(6),
    },
    chipText: {
        color: '#041C45',
        fontWeight: '500',
    },
    chipActive: {
        backgroundColor: '#041C45',
    },
    chipTextActive: {
        color: '#fff',
    },
    rangeSlider: {
        width: '100%',
        height: moderateScale(50),
        resizeMode: 'contain',
        marginTop: moderateScale(4),
    },
    priceRangeTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(4),
        backgroundColor: 'red'
    },
    priceText: {
        color: '#000',
        fontSize: moderateScale(12),
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(24),
    },
    resetBtn: {
        backgroundColor: '#F3F6FA',
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(24),
    },
    applyBtn: {
        backgroundColor: '#041C45',
        paddingHorizontal: moderateScale(24),
        paddingVertical: moderateScale(10),
        borderRadius: moderateScale(24),
    },
    resetText: {
        color: '#041C45',
        fontWeight: '600',
    },
    applyText: {
        color: '#fff',
        fontWeight: '600',
    },
})