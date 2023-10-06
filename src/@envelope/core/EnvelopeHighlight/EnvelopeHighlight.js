import * as Prism from 'prismjs';
import PropTypes from 'prop-types';
import './prism-languages';
import {styled} from "@mui/material";
import classNames from "classnames";
import {useRef, useEffect, useMemo, Fragment} from "react";

function EnvelopeHighlight(props) {
    const { async, children, className, component: Wrapper } = props;

    const domNode = useRef(null);

    useEffect(() => {
        if(domNode.current)
            Prism.highlightElement(domNode.current, async);
    }, [children, async])

    return useMemo(() => {
        const trimCode = () => {
            let sourceString = children;

            if (typeof sourceString === 'object' && sourceString.default){
                sourceString = sourceString.default;
            }

            // 对传进来的代码进行行分割，每一行为数组的item
            const sourceLines = sourceString.split('\n');

            // 移除第一行和最后一行
            if (!sourceLines[0].trim()) {
                sourceLines.shift();
            }

            if (!sourceLines[sourceLines.length - 1].trim()) {
                sourceLines.pop();
            }

            // 找到第一个不是空格的字符的索引
            const indexOfFirstChar = sourceLines[0].search(/\S|$/);

            // 输出
            let sourceRaw = '';

            sourceLines.forEach((line, index) => {
                // 变成  1 <p></p>
                //      2 hello
                // 的形式   即为 行号 + 内容
                sourceRaw += line.substr(indexOfFirstChar, line.length);

                // 如果不是最后一行
                if (index !== sourceLines.length - 1) {
                    // 手动添加换行
                    sourceRaw = `${sourceRaw}\n`;
                }
            });
            return sourceRaw || '';
        }

        return(
            <Fragment>
                <Wrapper ref={domNode} className={classNames('border', className)}>
                    {trimCode()}
                </Wrapper>
            </Fragment>
        )
    }, [children, className])
}

EnvelopeHighlight.propTypes = {
    component: PropTypes.node
};

EnvelopeHighlight.defaultProps = {
    component: 'code'
}

export default styled(EnvelopeHighlight);