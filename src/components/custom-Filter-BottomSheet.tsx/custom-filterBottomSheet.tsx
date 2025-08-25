import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { forwardRef } from "react";
import { Text, View } from "react-native";
import { styles } from "../../../src/screens/most-popular-screen/most-popular-styles";
import { moderateScale } from "../../utils/deviceConfig";
import RBBottomSheet from "../custom-BottomSheet/custom-BottomSheet";
import CustomButton from "../custom-Button/button";
import CategoryChips from "../custom-Chips/category-Chips";

interface FilterBottomSheetProps {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedSort: string;
  setSelectedSort: (val: string) => void;
  selectedRating: string;
  setSelectedRating: (val: string) => void;
  range: number[];
  setRange: (val: number[]) => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterBottomSheet = forwardRef<any, FilterBottomSheetProps>(
  (
    {
      selectedCategory,
      setSelectedCategory,
      selectedSort,
      setSelectedSort,
      selectedRating,
      setSelectedRating,
      range,
      setRange,
      onApply,
      onReset,
    },
    ref
  ) => {
    return (
      <RBBottomSheet
        ref={ref}
        customHeight={480}
        closeOnDragDown
        withCloseButton={false}
        containerStyle={styles.bottomSheetStyle}
        child={
          <View>
            <Text style={styles.sheetTitle}>Sort & Filter</Text>
            <View style={styles.dividerLine} />

            {/* Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <CategoryChips
              data={["All", "Computer", "Laptop", "Accessories"]}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />

            {/* Price Range */}
            <Text style={styles.sectionTitle}>Price Range</Text>
            <View style={styles.priceRangeTextContainer}>
              <MultiSlider
                values={range}
                sliderLength={360}
                onValuesChange={(val) => setRange(val)}
                min={100}
                max={1000}
                step={10}
                selectedStyle={{
                  backgroundColor: "#001f4d",
                  height: 4,
                  borderRadius: 2,
                }}
                unselectedStyle={{
                  backgroundColor: "#e0e0e0",
                  height: 4,
                  borderRadius: 2,
                }}
                customMarker={(e) => (
                  <View style={{ alignItems: "center" }}>
                    {e?.pressed && (
                      <View style={styles.priceBox}>
                        <Text style={styles.priceText2}>
                          ₹{e.currentValue}
                        </Text>
                      </View>
                    )}
                    <View
                      style={e?.pressed ? styles.thumbActive : styles.thumb}
                    />
                  </View>
                )}
              />
            </View>

            {/* Sort By */}
            <Text style={styles.sectionTitle}>Sort By</Text>
            <CategoryChips
              data={["Popular", "Most Recent", "Price High", "Low to High"]}
              selected={selectedSort}
              setSelected={setSelectedSort}
            />

            {/* Rating */}
            <Text style={styles.sectionTitle}>Rating</Text>
            <CategoryChips
              data={["All", "5", "4", "3", "2"]}
              extraString={"⭐"}
              selected={selectedRating}
              setSelected={setSelectedRating}
            />

            <View style={styles.dividerLine} />

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <CustomButton
                title="Reset"
                onPress={onReset}
                containerStyle={{
                  width: "48%",
                  height: moderateScale(50),
                  borderRadius: 28,
                }}
              />
              <CustomButton
                title="Apply"
                onPress={onApply}
                containerStyle={{
                  width: "48%",
                  height: moderateScale(50),
                  borderRadius: 28,
                }}
              />
            </View>
          </View>
        }
      />
    );
  }
);

export default FilterBottomSheet;
